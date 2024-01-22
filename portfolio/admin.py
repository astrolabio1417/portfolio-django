from django.contrib import admin
from portfolio.models import Education, Experience, Project, Technology, User

admin.site.register(User)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Project)
admin.site.register(Technology)
