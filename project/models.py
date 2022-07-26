from django.db import models
from skill.models import Skill


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=64)
    url = models.URLField()
    description = models.TextField()
    technology = models.ManyToManyField(Skill)
    image = models.ImageField(upload_to="projects")

    def __str__(self) -> str:
        return f"{self.pk} {self.name} {self.url}"
