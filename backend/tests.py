import datetime
from django.test import TestCase
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from backend.models import Product

class ProductResourceTest(ResourceTestCase):
  fixtures = ['backend/test_products.json']

  def setUp(self):
    super(ProductResourceTest, self).setUp()
    self.product_1 = Product.objects.get(code='first-product')
    self.detail_url = '/api/v1/product/{0}/'.format(self.product_1.code)

  def test_get_list_json(self):
    resp = self.api_client.get('/api/v1/product/', format='json')
    self.assertValidJSONResponse(resp)

    self.assertEqual(len(self.deserialize(resp)['objects']), 3)
    self.assertEqual(self.deserialize(resp)['objects'][0], {
      u'code': u'first-product',
      u'name': u'First',
      u'description': u'first description',
      u'id': 1,
      u'inventory_count': 42,
      u'resource_uri': u'/api/v1/product/first-product/'
    })

  def test_get_detail_json(self):
    resp = self.api_client.get(self.detail_url, format='json')
    self.assertValidJSONResponse(resp)

    self.assertKeys(self.deserialize(resp), ['code', 'name', 'description', 'inventory_count', 'id', 'resource_uri'])
    self.assertEqual(self.deserialize(resp)['name'], 'First')

  def test_post_list(self):
    test_data = {'code':'test-create', 'name': 'Testie', 'description': 'Lorem ipsum', 'inventory_count': 42 }

    self.assertEqual(Product.objects.count(), 3)
    self.assertHttpCreated(self.api_client.post('/api/v1/product/', format='json', data=test_data))
    self.assertEqual(Product.objects.count(), 4)

  def test_patch_detail(self):
    new_description = 'Updated: First Product'
    new_data = { 'description': new_description }
    self.assertEqual(Product.objects.count(), 3)
    self.assertHttpAccepted(self.api_client.patch(self.detail_url, format='json', data=new_data))
    self.assertEqual(Product.objects.count(), 3)
    self.assertEqual(Product.objects.get(code='first-product').description, new_description)

  def test_delete_detail(self):
    self.assertEqual(Product.objects.count(), 3)
    self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json'))
    self.assertEqual(Product.objects.count(), 2)

