from tastypie.resources import ModelResource
from backend.models import Product

class ProductResource(ModelResource):
  class Meta:
    queryset = Product.objects.all()
    list_allowed_methods = ['get', 'post']
    detail_allowed_methods = ['get', 'post', 'delete']
    always_return_data = True
    detail_uri_name = 'code'

