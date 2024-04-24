from django.urls import path
from .views import (
    RegisterUserView,
    VerifyUserEmail,
    LoginUserView,
    TestAuthenticationView,
    SetNewPassword,
    PasswordResetConfirm,
    PasswordResetRequestView,
    LogoutUserView)
from rest_framework_simplejwt.views import (TokenRefreshView, )

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('login/', LoginUserView.as_view(), name='login-user'),
    path('get-something/', TestAuthenticationView.as_view(),
         name='just-for-testing'),
    path('password-reset/', PasswordResetRequestView.as_view(),
         name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/',
         PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPassword.as_view(),
         name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
]
