from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name= 'blog-home' ),
    path('about/', views.about, name= 'blog-about' ),
    path('submit/', views.submit_form, name='submit_form'),
    path('thank_you/', views.thank_you, name='thank_you'),
    path('submissions/', views.submissions_list, name='submissions'),
    path('delete_submission/<int:submission_id>/', views.delete_submission, name='delete_submission'),

]
