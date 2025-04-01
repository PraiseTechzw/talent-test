"""
WSGI config for talent_verify project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'talent_verify.settings')

application = get_wsgi_application()

