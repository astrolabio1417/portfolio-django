from django.shortcuts import render
from django.conf import settings
from .models import Technology, Project, UserInfo


def home(request):
    technologies = Technology.objects.all()
    projects = Project.objects.all().order_by("date")
    media_url = f"https://{settings.AWS_S3_CUSTOM_DOMAIN}"

    if settings.DEBUG:
        media_url = "/media"

    return render(
        request,
        "index.html",
        {
            "skills": technologies,
            "projects": projects,
            "projects_reverse": list(reversed(projects)),
            "media_url": media_url,
            "user_info": UserInfo.objects.first(),
        },
    )

from django.http import HttpResponse, Http404
import os, subprocess, glob


def backup(request):
    if not request.user.is_superuser:
        raise Http404
    
    subprocess.run("python manage.py dbbackup", shell=True)
    files = glob.glob("./backup/*")
    latest_file = max(files, key=os.path.getctime)
    file_path = os.path.join(latest_file)

    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
        
    raise Http404 
