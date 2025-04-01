from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth.models import User
from .models import Company, Employee, EmploymentHistory, UserProfile, AuditLog
from .serializers import (
    CompanySerializer, EmployeeSerializer, EmploymentHistorySerializer,
    UserProfileSerializer, UserSerializer, AuditLogSerializer, RegisterSerializer,
    SearchSerializer
)
from .permissions import IsAdminUser, IsCompanyManagerOrReadOnly, IsHRStaffOrReadOnly
import csv
import io
import pandas as pd
from rest_framework.authtoken.models import Token

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsCompanyManagerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['registration_date', 'employee_count']
    search_fields = ['name', 'registration_number', 'contact_person']
    ordering_fields = ['name', 'registration_date', 'employee_count']

    @action(detail=False, methods=['post'])
    def bulk_upload(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        if file.name.endswith('.csv'):
            decoded_file = file.read().decode('utf-8')
            io_string = io.StringIO(decoded_file)
            reader = csv.DictReader(io_string)
            companies = []
            
            for row in reader:
                # Process CSV row into Company object
                companies.append(Company(
                    name=row['name'],
                    registration_date=row['registration_date'],
                    registration_number=row['registration_number'],
                    address=row['address'],
                    contact_person=row['contact_person'],
                    departments=row['departments'].split(','),
                    employee_count=int(row['employee_count']),
                    phone=row['phone'],
                    email=row['email']
                ))
            
            # Bulk create companies
            Company.objects.bulk_create(companies)
            return Response({'message': f'{len(companies)} companies created successfully'})
        
        elif file.name.endswith(('.xls', '.xlsx')):
            # Process Excel file
            df = pd.read_excel(file)
            companies = []
            
            for _, row in df.iterrows():
                companies.append(Company(
                    name=row['name'],
                    registration_date=row['registration_date'],
                    registration_number=row['registration_number'],
                    address=row['address'],
                    contact_person=row['contact_person'],
                    departments=str(row['departments']).split(','),
                    employee_count=int(row['employee_count']),
                    phone=row['phone'],
                    email=row['email']
                ))
            
            # Bulk create companies
            Company.objects.bulk_create(companies)
            return Response({'message': f'{len(companies)} companies created successfully'})
        
        return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsHRStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['company', 'department', 'start_date', 'end_date']
    search_fields = ['name', 'employee_id', 'role']
    ordering_fields = ['name', 'start_date', 'end_date']

    @action(detail=False, methods=['post'])
    def bulk_upload(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['file']
        if file.name.endswith('.csv'):
            decoded_file = file.read().decode('utf-8')
            io_string = io.StringIO(decoded_file)
            reader = csv.DictReader(io_string)
            employees = []
            
            for row in reader:
                # Get company by name or ID
                try:
                    if 'company_id' in row:
                        company = Company.objects.get(id=row['company_id'])
                    else:
                        company = Company.objects.get(name=row['company'])
                    
                    # Process CSV row into Employee object
                    employees.append(Employee(
                        name=row['name'],
                        employee_id=row['employee_id'],
                        company=company,
                        department=row['department'],
                        role=row['role'],
                        start_date=row['start_date'],
                        end_date=row['end_date'] if row['end_date'] else None,
                        duties=row['duties']
                    ))
                except Company.DoesNotExist:
                    return Response({
                        'error': f'Company not found: {row.get("company", row.get("company_id"))}'
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            # Bulk create employees
            Employee.objects.bulk_create(employees)
            return Response({'message': f'{len(employees)} employees created successfully'})
        
        elif file.name.endswith(('.xls', '.xlsx')):
            # Process Excel file
            df = pd.read_excel(file)
            employees = []
            
            for _, row in df.iterrows():
                try:
                    if 'company_id' in df.columns:
                        company = Company.objects.get(id=row['company_id'])
                    else:
                        company = Company.objects.get(name=row['company'])
                    
                    employees.append(Employee(
                        name=row['name'],
                        employee_id=row['employee_id'],
                        company=company,
                        department=row['department'],
                        role=row['role'],
                        start_date=row['start_date'],
                        end_date=row['end_date'] if pd.notna(row['end_date']) else None,
                        duties=row['duties']
                    ))
                except Company.DoesNotExist:
                    return Response({
                        'error': f'Company not found: {row.get("company", row.get("company_id"))}'
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            # Bulk create employees
            Employee.objects.bulk_create(employees)
            return Response({'message': f'{len(employees)} employees created successfully'})
        
        return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)


class EmploymentHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EmploymentHistory.objects.all()
    serializer_class = EmploymentHistorySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['employee', 'company', 'department', 'start_date', 'end_date']
    search_fields = ['employee__name', 'company__name', 'role']
    ordering_fields = ['start_date', 'end_date']


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['role', 'company']
    search_fields = ['user__username', 'user__email', 'user__first_name', 'user__last_name']


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['user', 'action', 'entity_type', 'timestamp']
    search_fields = ['user__username', 'entity_type', 'entity_id']
    ordering_fields = ['timestamp']


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Create token for the new user
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }, status=status.HTTP_201_CREATED)
        # Return detailed error messages
        error_messages = {}
        for field, errors in serializer.errors.items():
            if isinstance(errors, list):
                error_messages[field] = errors[0]
            else:
                error_messages[field] = str(errors)
        return Response({
            'detail': 'Registration failed',
            'errors': error_messages
        }, status=status.HTTP_400_BAD_REQUEST)


class SearchView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = SearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        
        # Build query based on search parameters
        query = Q()
        
        if 'name' in serializer.validated_data:
            query &= Q(name__icontains=serializer.validated_data['name'])
        
        if 'employee_id' in serializer.validated_data:
            query &= Q(employee_id__icontains=serializer.validated_data['employee_id'])
        
        if 'company' in serializer.validated_data:
            query &= Q(company__name__icontains=serializer.validated_data['company'])
        
        if 'department' in serializer.validated_data:
            query &= Q(department__icontains=serializer.validated_data['department'])
        
        if 'role' in serializer.validated_data:
            query &= Q(role__icontains=serializer.validated_data['role'])
        
        if 'start_date_from' in serializer.validated_data:
            query &= Q(start_date__gte=serializer.validated_data['start_date_from'])
        
        if 'start_date_to' in serializer.validated_data:
            query &= Q(start_date__lte=serializer.validated_data['start_date_to'])
        
        if 'is_active' in serializer.validated_data:
            if serializer.validated_data['is_active']:
                query &= Q(end_date__isnull=True)
            else:
                query &= Q(end_date__isnull=False)
        
        # Execute query
        employees = Employee.objects.filter(query)
        
        # Paginate results
        page = self.paginate_queryset(employees)
        if page is not None:
            serializer = EmployeeSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            from rest_framework.pagination import PageNumberPagination
            self._paginator = PageNumberPagination()
        return self._paginator
    
    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)
    
    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get counts for dashboard metrics
        total_companies = Company.objects.count()
        total_employees = Employee.objects.count()
        active_employees = Employee.objects.filter(end_date__isnull=True).count()
        recent_activities = AuditLog.objects.all().order_by('-timestamp')[:10]
        
        # Get top companies by employee count
        top_companies = Company.objects.order_by('-employee_count')[:5]
        
        # Get recent employees
        recent_employees = Employee.objects.order_by('-created_at')[:5]
        
        data = {
            'metrics': {
                'total_companies': total_companies,
                'total_employees': total_employees,
                'active_employees': active_employees,
                'inactive_employees': total_employees - active_employees,
            },
            'top_companies': CompanySerializer(top_companies, many=True).data,
            'recent_employees': EmployeeSerializer(recent_employees, many=True).data,
            'recent_activities': AuditLogSerializer(recent_activities, many=True).data,
        }
        
        return Response(data)

