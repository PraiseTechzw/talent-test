from django.utils.deprecation import MiddlewareMixin
from .models import AuditLog
import json

class AuditLogMiddleware(MiddlewareMixin):
    """
    Middleware to log user actions for auditing purposes.
    """
    
    def process_response(self, request, response):
        # Skip logging for certain paths
        skip_paths = ['/admin/jsi18n/', '/static/', '/media/']
        for path in skip_paths:
            if request.path.startswith(path):
                return response
        
        # Only log actions for authenticated users
        if not request.user.is_authenticated:
            return response
        
        # Determine action based on request method and path
        action = 'view'  # Default action
        if request.method == 'POST':
            action = 'create'
        elif request.method == 'PUT' or request.method == 'PATCH':
            action = 'update'
        elif request.method == 'DELETE':
            action = 'delete'
        
        # Determine entity type based on path
        entity_type = None
        entity_id = None
        
        if '/api/companies/' in request.path:
            entity_type = 'company'
            parts = request.path.strip('/').split('/')
            if len(parts) > 2 and parts[2].isdigit():
                entity_id = parts[2]
        elif '/api/employees/' in request.path:
            entity_type = 'employee'
            parts = request.path.strip('/').split('/')
            if len(parts) > 2 and parts[2].isdigit():
                entity_id = parts[2]
        elif '/api/auth/token/' in request.path:
            entity_type = 'auth'
            action = 'login'
        
        # Skip if we couldn't determine the entity type
        if not entity_type:
            return response
        
        # Get request body for details
        details = None
        if request.body and request.content_type == 'application/json':
            try:
                # Mask sensitive data
                body_data = json.loads(request.body)
                if 'password' in body_data:
                    body_data['password'] = '********'
                details = body_data
            except json.JSONDecodeError:
                pass
        
        # Create audit log entry
        AuditLog.objects.create(
            user=request.user,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details,
            ip_address=self.get_client_ip(request)
        )
        
        return response
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

