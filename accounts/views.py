from django.shortcuts import render
from .forms import RegistrationForm


def registration(request):
    form = RegistrationForm()
    success = False

    if request.POST:
        form = RegistrationForm(request.POST)

        if form.is_valid():
            form.save()
            success = True

    return render(
        request,
        "accounts/registration.html",
        {"registration_form": form, "success": success},
    )
