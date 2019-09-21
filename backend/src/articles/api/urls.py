from django.urls import path

from .views import ArticleListAPIView, ArticleDetailAPIView, ArticleCreateAPIView, ArticleUpdateAPIView, ArticleDestroyAPIView

urlpatterns = [
    path("", ArticleListAPIView.as_view(), name=""),
    path("create/", ArticleCreateAPIView.as_view(), name=""),
    path("<pk>/", ArticleDetailAPIView.as_view(), name=""),
    path("<pk>/update/", ArticleUpdateAPIView.as_view(), name=""),
    path("<pk>/delete/", ArticleDestroyAPIView.as_view(), name=""),
]
