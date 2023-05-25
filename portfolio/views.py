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

from django.http import HttpResponse, Http404
import os, subprocess, glob


def backup(request):
    if (not request.user.is_superuser):
        return Http404
    
    subprocess.run("py manage.py dbbackup")
    files = glob.glob("./backup/*")
    latest_file = max(files, key=os.path.getctime)
    file_path = os.path.join(latest_file)

    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
        
    raise Http404 