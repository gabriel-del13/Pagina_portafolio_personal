from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from django.core.mail import send_mail
from django.conf import settings
from .pagination import LargeResultsSetPagination
from .models import Profile, Skill, Project, ProjectImage, Contact
from .serializers import (
    ProfileSerializer, SkillSerializer, ProjectSerializer, 
    ProjectListSerializer, ProjectImageSerializer, ContactSerializer
)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Obtener el perfil actual (el primero)"""
        profile = Profile.objects.first()
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        return Response({'detail': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('order')
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = LargeResultsSetPagination
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Agrupar skills por categoría"""
        categories = {}
        for choice in Skill.CATEGORY_CHOICES:
            category_key = choice[0]
            skills = Skill.objects.filter(category=category_key)
            categories[category_key] = SkillSerializer(skills, many=True).data
        return Response(categories)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Obtener proyectos destacados"""
        projects = Project.objects.filter(featured=True)
        serializer = ProjectListSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Enviar email de notificación
        try:
            send_mail(
                subject=f"Nuevo contacto: {serializer.data['subject']}",
                message=f"""
                    Nuevo mensaje de contacto:

                    Nombre: {serializer.data['name']}
                    Email: {serializer.data['email']}
                    Asunto: {serializer.data['subject']}

                    Mensaje:
                    {serializer.data['message']}

                    ---
                    Enviado desde tu sitio web de Portafolio el {serializer.data['created_at']}
                """,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error enviando email: {e}")
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)