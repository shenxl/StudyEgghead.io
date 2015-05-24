

(function(){
    'use strict';
    var app = angular.module('app' ,[] , function config($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });

    app.constant('API_URL','http://localhost:3000');

    app.controller('MainCtrl',function MainCtrl($scope,RandomUserFactory,UserFactory){
        'use strict';
        $scope.getRandomUser = getRandomUser;
        $scope.login = login;
        $scope.logout = logout;

        // initialization

        UserFactory.getUser().then(function success(response){
            $scope.user = response.data;
        })

        function getRandomUser(){
            RandomUserFactory.getUser().then(function success(response){
                $scope.randomUser = response.data;
            },handleError);
        }

        function login(username,password){
            UserFactory.login(username,password).then(function success(response){
                $scope.user = response.data.user;
                //alert(response.data.token);
            },handleError);
        }

        function logout(){
            UserFactory.logout();
            $scope.user = null;
        }

        function handleError(response){
            alert('Error:' + response.data);
        }

    });

    app.factory('RandomUserFactory',function RandomUserFactory($http,API_URL){
        'use strict';
        return {
            getUser : getUser
        };

        function getUser(){
            return $http.get(API_URL + '/random-user');
        }
    });

    app.factory('UserFactory',function UserFactory($http,$q,API_URL,AuthTokenFactory){
        'use strict';
        return {
            login : login,
            logout : logout,
            getUser : getUser
        };

        function login(username,password){
            return $http.post(API_URL + '/login',{
                username : username,
                password : password
            }).then(function success(respose){
                AuthTokenFactory.setToken(respose.data.token);
                return respose;
            });
        }

        function logout(){
            AuthTokenFactory.setToken();
        }

        function getUser(){
            if(AuthTokenFactory.getToken()){
                return $http.get(API_URL + '/me');
            }else{
                return $q.reject({data : 'client has no auth token'});
            }
        }
    });

    app.factory('AuthTokenFactory',function AuthTokenFactory($window){
        'use strict';
        var store = $window.localStorage;
        var key = 'auth-token';

        return {
            getToken : getToken,
            setToken : setToken
        }

        function getToken(){
            return store.getItem(key);
        }

        function setToken(token){
            if(token){
                store.setItem(key,token);
            }else{
                store.removeItem(key);
            }
        }
    });

    app.factory('AuthInterceptor',function AuthInterceptor(AuthTokenFactory){
        'use strict';
        return {
            request : addToken
        };

        function addToken(config){
            var token = AuthTokenFactory.getToken();
            if(token){
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
                //config.headers.shenTest = 'hi';
            }
            return config;
        }
    });
})();