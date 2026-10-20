from django.shortcuts import render, redirect
from .models import Contact

def contact(request):
    return render(request, "contact.html")

def about(request):
    return render(request, "about.html")
from django.shortcuts import render, redirect
from .models import Contact

def contact(request):
    if request.method == "POST":
        Contact.objects.create(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            phone=request.POST.get("phone"),
            subject=request.POST.get("subject"),
            message=request.POST.get("message"),
        )
        return redirect("contact")

    return render(request, "contact.html")