from django.shortcuts import render
from django.conf import settings
from .models import Technology, Project


def home(request):
    technologies = Technology.objects.all()
    languages = technologies.filter(type="L")
    platforms = technologies.filter(type="P")
    frontends = technologies.filter(type="FE")
    backends = technologies.filter(type="BE")
    projects = Project.objects.all()
    media_url = f"https://{settings.AWS_S3_CUSTOM_DOMAIN}"

    if settings.DEBUG:
        media_url = "/media"

    return render(
        request,
        "home.html",
        {
            "technologies": {
                "language": languages,
                "frontend": frontends,
                "backend": backends,
                "platform": platforms,
            },
            "projects": projects,
            "media_url": media_url,
        },
    )
