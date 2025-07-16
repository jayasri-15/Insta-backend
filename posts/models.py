from django.db import models

class Post(models.Model):
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    caption = models.TextField()
    like = models.IntegerField()

    def __str__(self):
        return self.user_name  # or use caption or any valid field


