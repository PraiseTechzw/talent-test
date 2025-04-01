from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet, EmployeeViewSet, EmploymentHistoryViewSet,
    UserProfileViewSet, AuditLogViewSet, RegisterView, SearchView,
    DashboardView
)

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'employment-history', EmploymentHistoryViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'audit-logs', AuditLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('search/', SearchView.as_view(), name='search'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]

