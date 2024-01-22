from django.shortcuts import render
from django.conf import settings
from .models import Technology, Project, User, Education, Experience


def home(request):
    username = "astrolabio1417"

    user = User.objects.get(username=username)

    return render(
        request,
        "portfolio/index.html",
        {
            "user": user,
            "technologies": user.technologies.all(),
            "projects": Project.objects.filter(user=user),
            "educations": Education.objects.filter(user=user),
            "experiences": Experience.objects.filter(user=user),
        },
    )
