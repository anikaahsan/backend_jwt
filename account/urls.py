from django.urls import path
from .import views

urlpatterns=[
      path('register/', views.RegistrationView.as_view(), name='register'),
      path('login/', views.LoginView.as_view(), name='login'),
      path('profile/', views.ProfileView.as_view(), name='profile'),
      path('product/', views.ProductView.as_view(), name='product'),
]