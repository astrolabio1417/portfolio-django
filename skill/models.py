from django.db import models


# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=25)
    image = models.ImageField(upload_to="skills")

    def __str__(self) -> str:
        return f"{self.pk} {self.name}"
