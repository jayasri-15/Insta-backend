from django.urls import path
from . import views 

urlpatterns = [
    # Home
    path('', views.home, name='home'),

    # CBV CRUD URLs 
    path('posts/', views.PostListCreateAPIView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetailAPIView.as_view(), name='post-detail'),
]
