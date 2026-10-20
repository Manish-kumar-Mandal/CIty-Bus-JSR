from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    profile_image = models.ImageField(upload_to="profile_images/", default="profile_images/default.png")

    def _str_(self):
        return self.user.username