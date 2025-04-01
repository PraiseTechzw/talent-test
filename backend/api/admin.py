from django.contrib import admin
from .models import Company, Employee, EmploymentHistory, UserProfile, AuditLog

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_number', 'registration_date', 'contact_person', 'employee_count')
    search_fields = ('name', 'registration_number', 'contact_person')
    list_filter = ('registration_date',)
    date_hierarchy = 'registration_date'


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'employee_id', 'company', 'department', 'role', 'start_date', 'end_date', 'is_active')
    search_fields = ('name', 'employee_id', 'role')
    list_filter = ('company', 'department', 'start_date')
    date_hierarchy = 'start_date'


@admin.register(EmploymentHistory)
class EmploymentHistoryAdmin(admin.ModelAdmin):
    list_display = ('employee', 'company', 'role', 'start_date', 'end_date')
    search_fields = ('employee__name', 'company__name', 'role')
    list_filter = ('company', 'start_date')
    date_hierarchy = 'start_date'


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'company', 'phone')
    search_fields = ('user__username', 'user__email', 'phone')
    list_filter = ('role', 'company')


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'entity_type', 'entity_id', 'timestamp')
    search_fields = ('user__username', 'entity_type', 'entity_id')
    list_filter = ('action', 'timestamp')
    date_hierarchy = 'timestamp'
    readonly_fields = ('user', 'action', 'entity_type', 'entity_id', 'details', 'ip_address', 'timestamp')

