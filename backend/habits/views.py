from rest_framework.viewsets import ModelViewSet
from .models import Habit, CheckIn
from .serializers import HabitSerializer, CheckInSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse
from .pdf_utils import generate_habit_report
from .models import Habit

class HabitViewSet(ModelViewSet):
    queryset=Habit.objects.all().order_by('-created_at')
    serializer_class=HabitSerializer

class CheckInViewSet(ModelViewSet):
    queryset=CheckIn.objects.all().order_by('-date')
    serializer_class=CheckInSerializer

@api_view(["GET"])
def export_pdf(request):
    habits = Habit.objects.all().values()  # fetch basic fields

    # get check-ins for each habit
    habits_list = []
    for habit in Habit.objects.all():
        habits_list.append({
            "name": habit.name,
            "category": habit.category,
            "frequency": habit.frequency,
            "start_date": str(habit.start_date),
            "checkins": [
                {"date": str(c.date), "note": c.note}
                for c in habit.checkins.all()
            ],
        })

    pdf_buffer = generate_habit_report(habits_list)

    response = HttpResponse(pdf_buffer, content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="habit_report.pdf"'
    return response