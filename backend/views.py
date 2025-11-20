from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PersonSerializer
from .models import Person
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count

class PersonnelView(APIView):
    """
    API View to handle personnel data operations.
    """
    
    def get(self, request):
        personnel = Person.objects.all()
        serializer = PersonSerializer(personnel, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StatisticsView(APIView):
    """
    API View to get dashboard statistics.
    """
    
    def get(self, request):
        # Total personnel count
        total_personnel = Person.objects.count()
        
        # Personnel added this month
        current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        personnel_this_month = Person.objects.filter(created_at__gte=current_month_start).count()
        
        # Personnel added yesterday
        yesterday_start = timezone.now() - timedelta(days=1)
        yesterday_start = yesterday_start.replace(hour=0, minute=0, second=0, microsecond=0)
        yesterday_end = yesterday_start + timedelta(days=1)
        personnel_yesterday = Person.objects.filter(
            created_at__gte=yesterday_start, 
            created_at__lt=yesterday_end
        ).count()
        
        # Calculate percentage change for this month
        last_month_start = (current_month_start - timedelta(days=1)).replace(day=1)
        personnel_last_month = Person.objects.filter(
            created_at__gte=last_month_start,
            created_at__lt=current_month_start
        ).count()
        
        if personnel_last_month > 0:
            month_change = ((personnel_this_month - personnel_last_month) / personnel_last_month) * 100
        else:
            month_change = 100 if personnel_this_month > 0 else 0
        
        # Department breakdown
        department_counts = Person.objects.values('department').annotate(count=Count('id'))
        
        stats = {
            'total_personnel': total_personnel,
            'personnel_this_month': personnel_this_month,
            'personnel_yesterday': personnel_yesterday,
            'month_change_percentage': round(month_change, 1),
            'database_status': 'Connected',
            'department_breakdown': list(department_counts)
        }
        
        return Response(stats)
