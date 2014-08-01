import datetime
from django.test import TestCase
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from backend.models import Product

class ProductResourceTest(ResourceTestCase):
  fixtures = ['backend/test_products.json']

  def test_get_list_json(self):
    resp = self.api_client.get('/api/v1/product/', format='json')
    self.assertValidJSONResponse(resp)

    # Scope out the data for correctness.
    self.assertEqual(len(self.deserialize(resp)['objects']), 3)
    # Here, we're checking an entire structure for the expected data.
    self.assertEqual(self.deserialize(resp)['objects'][0], {
			u'code': u'first-product',
			u'name': u'First',
			u'description': u'first description',
			u'id': 1,
			u'inventory_count': 42,
			u'resource_uri': u'/api/v1/product/first-product/'
    })

  def test_get_detail_json(self):
    resp = self.api_client.get('/api/v1/product/first-product/', format='json')
    self.assertValidJSONResponse(resp)

    self.assertKeys(self.deserialize(resp), ['code', 'name', 'description', 'inventory_count', 'id', 'resource_uri'])
    self.assertEqual(self.deserialize(resp)['name'], 'First')

  #def test_post_list(self):
  #  # Check how many are there first.
  #  self.assertEqual(Entry.objects.count(), 5)
  #  self.assertHttpCreated(self.api_client.post('/api/v1/entries/', format='json', data=self.post_data, authentication=self.get_credentials()))
  #  # Verify a new one has been added.
  #  self.assertEqual(Entry.objects.count(), 6)

  #def test_put_detail(self):
  #  # Grab the current data & modify it slightly.
  #  original_data = self.deserialize(self.api_client.get(self.detail_url, format='json', authentication=self.get_credentials()))
  #  new_data = original_data.copy()
  #  new_data['title'] = 'Updated: First Post'
  #  new_data['created'] = '2012-05-01T20:06:12'

  #  self.assertEqual(Entry.objects.count(), 5)
  #  self.assertHttpAccepted(self.api_client.put(self.detail_url, format='json', data=new_data, authentication=self.get_credentials()))
  #  # Make sure the count hasn't changed & we did an update.
  #  self.assertEqual(Entry.objects.count(), 5)
  #  # Check for updated data.
  #  self.assertEqual(Entry.objects.get(pk=25).title, 'Updated: First Post')
  #  self.assertEqual(Entry.objects.get(pk=25).slug, 'first-post')
  #  self.assertEqual(Entry.objects.get(pk=25).created, datetime.datetime(2012, 3, 1, 13, 6, 12))

  #def test_delete_detail(self):
  #  self.assertEqual(Entry.objects.count(), 5)
  #  self.assertHttpAccepted(self.api_client.delete(self.detail_url, format='json', authentication=self.get_credentials()))
  #  self.assertEqual(Entry.objects.count(), 4)

