from tastypie.resources import ModelResource
from backend.models import Product

class ProductResource(ModelResource):
  class Meta:
    queryset = Product.objects.all()
    allowed_methods = ['post', 'get', 'put', 'delete']
    always_return_data = True
