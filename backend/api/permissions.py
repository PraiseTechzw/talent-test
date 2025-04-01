from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and hasattr(request.user, 'profile') and request.user.profile.role == 'admin'


class IsCompanyManagerOrReadOnly(permissions.BasePermission):
    """
    Allows full access to admin and company managers, read-only access to others.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user and hasattr(request.user, 'profile') and (
            request.user.profile.role == 'admin' or 
            request.user.profile.role == 'company_manager'
        )

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not hasattr(request.user, 'profile'):
            return False
        
        # Admin can do anything
        if request.user.profile.role == 'admin':
            return True
        
        # Company managers can only modify their own company
        if request.user.profile.role == 'company_manager':
            return request.user.profile.company == obj
        
        return False


class IsHRStaffOrReadOnly(permissions.BasePermission):
    """
    Allows full access to admin, company managers, and HR staff for their company.
    Read-only access to others.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user and hasattr(request.user, 'profile') and (
            request.user.profile.role == 'admin' or 
            request.user.profile.role == 'company_manager' or
            request.user.profile.role == 'hr_staff'
        )

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if not hasattr(request.user, 'profile'):
            return False
        
        # Admin can do anything
        if request.user.profile.role == 'admin':
            return True
        
        # Company managers and HR staff can only modify employees in their company
        if request.user.profile.role in ['company_manager', 'hr_staff']:
            return request.user.profile.company == obj.company
        
        return False

