from django.urls import path
from myproject import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
      path('', views.main)
]

urlpatterns += static(settings.STATIC_URL, document_root= settings.STATIC_ROOT)