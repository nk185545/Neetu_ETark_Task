# Etark_Task

TechStack : Node.js, Express.js, MongoDB
Deployed on : Heroku

https://fathomless-cliffs-92705.herokuapp.com/


1) First of all, we have main page like below :-
![m1](https://user-images.githubusercontent.com/80478598/131994724-0dac0b8b-99f1-42fa-ad7b-8da7328deb42.png)

In this we have sign up, sign in and home option. Home page is considered as the user page, which can be access by user after authentication.


2) Sign up page :
![m2](https://user-images.githubusercontent.com/80478598/131995057-d4ec3f53-fcb7-480b-bba8-3fb369f9b5b0.png)

3)Login page :
![m3](https://user-images.githubusercontent.com/80478598/131995053-848a2340-b767-49aa-9818-b1e5ea45ee14.png)


In this, I have also done validations. At the time of  registration, user must have a unique email id, he must has to fill all fields, otherwise error will be desplayed like "Email already exist".....


4) After successful registration and login, home page will be shown and a welcome message will be displayed with **name** .


**Main thing :  When user register or login, a token will be generated and stored in cookie. If user doesnot logout and close site and then instantly open then he can also open Home page because authentication will be successful (like github, amazon,...etc)



At the end, application is deployed on Heroku platform .
