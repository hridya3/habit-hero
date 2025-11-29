from django.db import models

class Habit(models.Model):
    FREQUENCIES = (('daily','Daily'),('weekly','Weekly'))
    name=models.CharField(max_length=200)
    category=models.CharField(max_length=100)
    frequency=models.CharField(max_length=10,choices=FREQUENCIES)
    start_date=models.DateField()
    created_at=models.DateTimeField(auto_now_add=True)

class CheckIn(models.Model):
    habit=models.ForeignKey(Habit,on_delete=models.CASCADE,related_name='checkins')
    date=models.DateField()
    note=models.TextField(blank=True,null=True)
