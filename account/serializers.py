from rest_framework import serializers
from account.models import CustomUser


class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password=serializers.CharField()
    

    class Meta:
        model=CustomUser
        fields=['username','email','password','confirm_password']

    #validatingpassword and confirm password while registering
    # def validate(self, attrs):
    #     password=attrs.get('password')
    #     confirm_password=attrs.get('confirm_password')
    #     if password != confirm_password:
    #         raise serializers.ValidationError('password and confirm password does not match')
    #     return attrs
    
    # def create(self, validated_data):
    #   return CustomUser.objects.create_user(**validated_data)
    

    def create(self, validated_data):
        if validated_data.get('password') != validated_data.get('confirm_password'):
            raise serializers.ValidationError("Those password don't match") 

         # confirm_password should not be sent to create as it is not part of User model
        validated_data.pop('confirm_password') 
        return super().create(validated_data)
         

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta:
        model=CustomUser
        fields=['email','password']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['username','email']      

