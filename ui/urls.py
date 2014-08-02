from os import path
from django.conf.urls.static import static 
from django.conf.urls import patterns, url
from django.conf import settings

APP_ROOT = path.join(settings.BASE_DIR, 'ui', 'app')

urlpatterns = patterns( '',
	url( r'^$', 'django.contrib.staticfiles.views.serve', kwargs={ 'path': 'index.html'}),
)

urlpatterns += static('/', document_root='ui/app/')
