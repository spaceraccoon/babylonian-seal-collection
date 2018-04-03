from backend.settings.common import *
import os
import dj_database_url

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = False

ALLOWED_HOSTS = ['.herokuapp.com']

db_from_env = dj_database_url.config(conn_max_age=500, require_ssl=True)
DATABASES['default'].update(db_from_env)