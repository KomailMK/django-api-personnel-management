from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    # Storing the face encoding as a JSON array
    # Requires MySQL 5.7.8+ for native JSON support
    face_encoding = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.department}"

    class Meta:
        db_table = 'personnel'
        verbose_name_plural = 'Personnel'
