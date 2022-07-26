from django.shortcuts import render
from project.models import Project
from django.conf import settings
from skill.models import Skill


def home(request):
    skills = Skill.objects.all()
    projects = Project.objects.all()
    return render(
        request,
        "home.html",
        {
            "skills": skills,
            "projects": projects,
            "s3_url": settings.AWS_S3_CUSTOM_DOMAIN,
        },
    )
