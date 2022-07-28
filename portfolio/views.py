from django.shortcuts import render
from django.conf import settings
from .models import Technology, Project


def home(request):
    technologies = Technology.objects.all()
    languages = technologies.filter(type="L")
    frameworks = technologies.filter(type="F")
    platforms = technologies.filter(type="P")
    projects = Project.objects.all()

    return render(
        request,
        "home.html",
        {
            "technologies": {
                "languages": languages,
                "frameworks": frameworks,
                "platforms": platforms,
            },
            "projects": projects,
            "s3_url": settings.AWS_S3_CUSTOM_DOMAIN,
        },
    )
