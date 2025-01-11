from django.shortcuts import render
from django.http import HttpResponse
import requests
from .models import FormSubmission
import pickle
import random
from django.views.decorators.csrf import csrf_exempt



with open("blog/quotes.pkl", "rb") as f:
    quotes = pickle.load(f)

def get_random_quote():
    quote = random.choice(quotes)
    return f"{quote['content']}\" - {quote['author']}"


# Create your views here.

def home(request):
    quote = get_random_quote()
    context = {'thought': quote}  
    return render(request, 'blog/home.html', context)

def about(request):
    return render(request,'blog/about.html')

from django.shortcuts import render, redirect

# def submit_form(request):
#     if request.method == 'POST':
#         # Get the data from the form
#         name = request.POST.get('name')
#         email = request.POST.get('email')
#         message = request.POST.get('message')

#         # Save the data to the database
#         FormSubmission.objects.create(name=name, email=email, message=message)

#         # Redirect to thank you page
#         return redirect('thank_you')
    
#     return render(request, 'form_page.html')


def thank_you(request):
    last_submission = FormSubmission.objects.last()
    
    context = {
        'name': last_submission.name,
        'email': last_submission.email,
        'message': last_submission.message
    }
    return render(request, 'blog/thank_you.html', context)

def submissions_list(request):
    submissions = FormSubmission.objects.all()
    return render(request, 'blog/submissions_list.html', {'submissions': submissions})

def delete_submission(request, submission_id):
    try:
        submission = FormSubmission.objects.get(id=submission_id)
        submission.delete()
        return redirect('submissions')  # Redirect to the submissions page after deletion
    except FormSubmission.DoesNotExist:
        return redirect('submissions')  # Redirect to submissions page if submission not found
    



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import FormSubmission

@csrf_exempt
def submit_form(request):
    if request.method == 'POST':
        print("Received a POST request")  # Check if this prints
        try:
            # Parse JSON data
            data = json.loads(request.body)
            print("Received Data:", data)  # Debug log

            name = data.get('name')
            email = data.get('email')
            message = data.get('message')

            if not all([name, email, message]):
                return JsonResponse({"status": "error", "message": "All fields are required."})

            # Save to the database
            FormSubmission.objects.create(name=name, email=email, message=message)
            print("Message saved successfully")  # Debug log
            return JsonResponse({"status": "success", "message": "Message saved successfully!"})
        except Exception as e:
            print("Error:", e)  # Debug log
            return JsonResponse({"status": "error", "message": str(e)})
    print("Invalid request method")  # Debug log
    return JsonResponse({"status": "error", "message": "Invalid request"})
