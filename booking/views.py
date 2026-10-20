from django.shortcuts import render

def book(request):
    return render(request, "bookticket.html")
def schedule(request):
    return render(request, "schedule.html")