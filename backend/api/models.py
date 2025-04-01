from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Company(models.Model):
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    registration_date = models.DateField()
    address = models.TextField()
    contact_person = models.CharField(max_length=255)
    departments = models.JSONField(default=list)  # Store as JSON array
    employee_count = models.PositiveIntegerField(default=0)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['name']


class Employee(models.Model):
    name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=100, unique=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    department = models.CharField(max_length=100)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    duties = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.employee_id})"

    @property
    def is_active(self):
        return self.end_date is None

    class Meta:
        ordering = ['-start_date', 'name']


class EmploymentHistory(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employment_history')
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    duties = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.name} at {self.company.name} ({self.role})"

    class Meta:
        verbose_name_plural = "Employment Histories"
        ordering = ['-start_date']


class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Administrator'),
        ('company_manager', 'Company Manager'),
        ('hr_staff', 'HR Staff'),
        ('regular_user', 'Regular User'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='regular_user')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name='staff')
    phone = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a UserProfile when a new User is created."""
    if created:
        UserProfile.objects.create(user=instance)


class AuditLog(models.Model):
    ACTION_CHOICES = (
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('view', 'View'),
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('other', 'Other'),
    )
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=10, choices=ACTION_CHOICES)
    entity_type = models.CharField(max_length=100)  # e.g., 'company', 'employee'
    entity_id = models.CharField(max_length=100, null=True, blank=True)
    details = models.JSONField(null=True, blank=True)  # Store additional details as JSON
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} {self.entity_type} by {self.user} at {self.timestamp}"

    class Meta:
        ordering = ['-timestamp']

