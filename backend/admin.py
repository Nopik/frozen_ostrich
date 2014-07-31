from django.contrib import admin
from backend.models import Product

class ProductAdmin( admin.ModelAdmin ):
	list_display = ('code', 'name', 'inventory_count')
	search_fields = [ 'code', 'name' ]

admin.site.register( Product, ProductAdmin )
