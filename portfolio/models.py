from django.db import models

TECHNOLOGY_CHOICES = [
    ("L", "LANGUAGE"),
    ("F", "FRAMEWORK"),
    ("P", "PLATFORM"),
]


class Technology(models.Model):
    name = models.CharField(max_length=25)
    logo = models.FileField(upload_to="logo")
    type = models.CharField(choices=TECHNOLOGY_CHOICES, max_length=1)

    def __str__(self) -> str:
        return f"{self.name} | {self.type}"


class Project(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="project/image")
    url = models.URLField(blank=True, null=True)
    repository = models.URLField(blank=True, null=True)
    description = models.TextField()
    technologies = models.ManyToManyField(Technology)

    def __str__(self) -> str:
        return f"{self.pk} {self.name}"