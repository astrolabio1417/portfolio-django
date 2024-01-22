from django.contrib import admin
from portfolio.models import Education, Experience, Project, Technology, User

from django.contrib.auth.admin import UserAdmin


UserAdmin.fieldsets[1][1]["fields"] = (
    "github_url",
    "contact_number",
    "resume",
    "linked_url",
    "about",
    "technologies",
)


# Register your models here.
class CustomUserAdmin(UserAdmin):
    fieldsets = (*UserAdmin.fieldsets,)


admin.site.register(User, CustomUserAdmin)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Project)
admin.site.register(Technology)
