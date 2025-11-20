from django.urls import path
from .views import PersonnelView, StatisticsView

urlpatterns = [
    path('personnel/', PersonnelView.as_view(), name='personnel-list'),
    path('statistics/', StatisticsView.as_view(), name='statistics'),
]
