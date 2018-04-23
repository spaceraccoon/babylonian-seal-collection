from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import boto3
from botocore.exceptions import ClientError
import mimetypes
import time
import uuid

from .models import Image
from .serializers import ImageSerializer

s3 = boto3.client('s3')


def check_key_exists(bucket, key):
    try:
        s3.head_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=key)
        return True
    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            return False
        raise


class ImageList(generics.ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class SignS3(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        file_name = request.data.get('fileName')
        file_type = request.data.get('fileType')
        client_method = request.data.get('clientMethod')
        root = 'uploads/{}/{}/{}'.format(time.strftime("%Y"),
                                         time.strftime("%m"), time.strftime("%d"))
        key = '{}/{}{}'.format(root,
                               uuid.uuid4().hex, mimetypes.guess_extension(file_type)) if client_method == 'put_object' else file_name

        # ensure no duplicate when uploading new file
        if client_method == 'put_object':
            while check_key_exists(settings.AWS_STORAGE_BUCKET_NAME, key):
                key = '{}/{}{}'.format(root,
                                       uuid.uuid4().hex, mimetypes.guess_extension(file_type))

        options = {'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                   'Key': key}
        if file_type:
            options['ContentType'] = file_type

        signed_url = s3.generate_presigned_url(
            client_method,
            options,
            3000
        )

        return Response({'signedUrl': signed_url, 'key': key})
