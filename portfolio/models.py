from django.db import models



class Technology(models.Model):
    TECHNOLOGY_CHOICES = [
        ("L", "LANGUAGE"),
        ("BE", "BACKEND"),
        ("FE", "FRONTEND"),
        ("P", "PLATFORM"),
    ]
    name = models.CharField(max_length=25)
    logo = models.FileField(upload_to="logo")
    type = models.CharField(choices=TECHNOLOGY_CHOICES, max_length=2)

    def __str__(self) -> str:
        return f"{self.name} | {self.type}"


class Project(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="project/image")
    url = models.URLField(blank=True, null=True)
    repository = models.URLField(blank=True, null=True)
    description = models.TextField()
    technologies = models.ManyToManyField(Technology)
    date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.pk} {self.name}"
    

class Education(models.Model):
    name = models.CharField(max_length=50)
    course = models.CharField(max_length=50)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name

class Experience(models.Model):
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    info = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name
    
    @property
    def is_current(self):
        import datetime
        return self.end_date > datetime.datetime.now().date()
    
class Certificate(models.Model):
    name = models.CharField(max_length=50)
    info = models.CharField(max_length=255)
    url = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Social(models.Model):
    name = models.CharField(max_length=50)
    url = models.URLField()

    def __str__(self) -> str:
        return self.name


class UserInfo(models.Model):
    hero_title = models.CharField(max_length=255)
    hero_sub = models.CharField(max_length=255)
    resume = models.FileField(upload_to="resume")
    educations = models.ManyToManyField(Education)
    experiences = models.ManyToManyField(Experience)
    certificates = models.ManyToManyField(Certificate)
    socials = models.ManyToManyField(Social)
    email = models.EmailField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.id} {self.email}"
