from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.validation import Validation
from backend.models import Product

class ProductValidation(Validation):
	def is_valid(self, bundle, request=None):
		errors = {}
		code = bundle.data['code']

		if request.method == 'POST':
			if code is not None:
				if Product.objects.filter(code=code).count() > 0:
					errors[ 'code' ] = [ 'Code already taken' ]
			else:
				errors[ 'code' ] = [ 'Invalid/missing code' ]

		return errors

class ProductResource(ModelResource):
	class Meta:
		queryset = Product.objects.all()
		list_allowed_methods = ['get', 'post']
		detail_allowed_methods = ['get', 'patch', 'delete']
		always_return_data = True
		detail_uri_name = 'code'
		authorization = Authorization()
		validation = ProductValidation()
