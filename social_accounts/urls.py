from django.urls import path
from .views import GoogleOauthSignInView, GithubOauthSignInView

urlpatterns = [
    path('google/', GoogleOauthSignInView.as_view(), name='google'),
    path('github/', GithubOauthSignInView.as_view(), name='github'),
]