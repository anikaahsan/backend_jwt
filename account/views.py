from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistrationSerializer,LoginSerializer,ProfileSerializer


def get_token_for_user(user):
    refresh=RefreshToken.for_user(user)
    return {
        'refresh':str(refresh),
        'access':str(refresh.access_token)
    }


class RegistrationView(APIView):

    def post(self,request):
        serializer=RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        # token=get_token_for_user(user)

        context=dict(
            # token=token,
            msg='registration succesful'
        )
        # return Response(context,status=status.HTTP_201_CREATED)
        return Response('registration successful')

       

class LoginView(APIView):
    ##can be changed
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email=serializer.data.get('email')
        password=serializer.data.get('password')
      
        user=authenticate(email=email,password=password)

        if user is not None:
            token=get_token_for_user(user)

            context=dict(
            token=token,
            # msg='login succesful'
        )
            return Response(context,status=status.HTTP_201_CREATED)
        else:
            return Response({'errors':'email or password is invalid'})
        
        
class ProfileView(APIView) :
    permission_classes=(IsAuthenticated,)

    def get(self,request):
        # serializer=ProfileSerializer(request.user)
        return Response(status=status.HTTP_200_OK)

class ProductView(APIView):
    permission_classes=(IsAuthenticated,)

    def get(self,request):
        return Response('nimusoft')