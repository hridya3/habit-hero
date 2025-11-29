from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from habits.views import *

router = routers.DefaultRouter()
router.register(r'habits', HabitViewSet)
router.register(r'checkins', CheckInViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/export-pdf/', export_pdf),
]
