from django.db import models

class FormSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)  # Renamed to match the database column

    def __str__(self):
        return self.name
