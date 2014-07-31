from django.db import models

class Product(models.Model):
  code = models.CharField(max_length=200, db_index=True, unique=True) #unique product code
  name = models.CharField(max_length=200) #human readable name
  description = models.CharField(max_length=2000)
  inventory_count = models.IntegerField(default=0)

  def __str__(self):
    return "[%s] %s" % (self.code, self.name)

