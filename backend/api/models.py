from django.db import models

class Students(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)  # Optional field
    last_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(max_length=254, blank=True, null=True)  # Optional field
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
