# Babylonian Seal Collection

## Introduction

A digital library for recording and displaying seals from the Yale Babylonian Collection. It is built on Django REST Framework (backend) and React (frontend).

## Prerequisites

1.  `pipenv`
2.  `yarn`: ^1.5.1
3.  `node`: ^8.11.1

## Development

1.  `git clone` and `cd` into project
2.  `pipenv install --dev`
3.  In `backend`, ceate `.env` from the `.env.sample` template
    * If you do not need image uploads, you only need to fill SECRET_KEY.
    * If you wna tto include image uploads, follow the "Prerequisite Tasks" and "Configuring CORS" section in the [S3 documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html) and save the information accordingly.
4.  Back in the root folder, run `pipenv shell`, `python manage.py migrate` and `python manage.py runserver`
5.  In another terminal, `cd frontend`, `yarn`, and `yarn start`
6.  After initial installation, you can start development by running `pipenv shell` then `python manage.py runserver` in one terminal and `cd frontend` and `yarn start` in another.
7.  To create an admin user, run `python manage.py createsuperuser` (Remember to run `pipenv shell` before).

# Deploy

Heroku deploy button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

For manual deploy:

1.  `heroku create`
2.  Run `heroku config:set ENV_VARIABLE=value` for the following variables:
    * `SECRET_KEY` (note that special characters may fail on the Heroku CLI/Windows, so you will need to set this via the the Heroku console)
    * `AWS_ACCESS_KEY`
    * `AWS_SECRET_ACCESS_KEY`
    * `AWS_STORAGE_BUCKET_NAME`
    * `DJANGO_SETTINGS_MODULE` (set to `backend.settings.production`)
3.  `heroku buildpacks:set heroku/python` then `heroku buildpacks:add --index 1 heroku/nodejs`
4.  `git push heroku master`
5.  To create a superuser, run `heroku run python manage.py createsuperuser`.
