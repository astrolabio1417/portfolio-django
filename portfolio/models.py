from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    contact_number = models.IntegerField(blank=True, null=True)
    resume = models.FileField(upload_to="resume/v2", blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    linked_url = models.URLField(blank=True, null=True)
    about = models.CharField(max_length=500, blank=True, null=True)
    technologies = models.ManyToManyField("portfolio.Technology")


class Technology(models.Model):
    name = models.CharField(max_length=25)
    logo = models.FileField(upload_to="logo/v2")

    def __str__(self):
        return self.name


class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.user.username} {self.school}"


class Experience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    technologies = models.ManyToManyField(Technology)

    def __str__(self):
        return f"{self.user.username} {self.company}"


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="project/image")
    url = models.URLField(blank=True, null=True)
    repository = models.URLField(blank=True, null=True)
    description = models.TextField()
    technologies = models.ManyToManyField(Technology)
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} {self.name}"
