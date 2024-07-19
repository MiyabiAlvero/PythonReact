from rest_framework import serializers
from .models import Students

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'contact_number', 'email', 'address']
