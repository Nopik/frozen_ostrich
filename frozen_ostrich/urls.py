from tastypie.api import Api
from django.conf.urls import patterns, include, url

from backend.api import ProductResource

from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(ProductResource())

urlpatterns = patterns('',
	url(r'^admin/', include(admin.site.urls)),
	url(r'^api/', include(v1_api.urls)),
	url(r'', include('ui.urls'))
)

