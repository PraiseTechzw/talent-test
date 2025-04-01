from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Company, Employee, EmploymentHistory, UserProfile, AuditLog


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'role', 'company', 'company_name', 'phone', 'created_at', 'updated_at']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'registration_number', 'registration_date', 
            'address', 'contact_person', 'departments', 'employee_count',
            'phone', 'email', 'created_at', 'updated_at'
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Employee
        fields = [
            'id', 'name', 'employee_id', 'company', 'company_name',
            'department', 'role', 'start_date', 'end_date', 'duties',
            'is_active', 'created_at', 'updated_at'
        ]


class EmploymentHistorySerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = EmploymentHistory
        fields = [
            'id', 'employee', 'employee_name', 'company', 'company_name',
            'department', 'role', 'start_date', 'end_date', 'duties', 'created_at'
        ]


class AuditLogSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = AuditLog
        fields = [
            'id', 'user', 'username', 'action', 'entity_type', 
            'entity_id', 'details', 'ip_address', 'timestamp'
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create UserProfile with admin role for the first user
        # For subsequent users, set as company_manager
        is_first_user = User.objects.count() == 1
        UserProfile.objects.create(
            user=user,
            role='admin' if is_first_user else 'company_manager'
        )

        return user


class SearchSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    employee_id = serializers.CharField(required=False)
    company = serializers.CharField(required=False)
    department = serializers.CharField(required=False)
    role = serializers.CharField(required=False)
    start_date_from = serializers.DateField(required=False)
    start_date_to = serializers.DateField(required=False)
    is_active = serializers.BooleanField(required=False)

