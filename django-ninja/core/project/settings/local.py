# flake8: noqa
from .main import *


# for dev
DEBUG = True
ELASTIC_APM["DEBUG"] = DEBUG

# for logging errors on prod
# DEBUG = False
# ELASTIC_APM["DEBUG"] = True
