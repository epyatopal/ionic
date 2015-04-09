// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'
  , 'starter.controllers'
  , 'pascalprecht.translate'
  , 'angular-jwt'
  , 'angular-storage'
])

.run(function($ionicPlatform, $rootScope, $state, store, jwtHelper) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    $rootScope.$on('$stateChangeStart', function(e, to) {
      if (to.data && to.data.requiresLogin) {
        if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          e.preventDefault();
          $state.go('app.login');
        }
      }
    });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

    $translateProvider.translations('en', {
      turn: 'For Restaurant <Br> Employees!',
      lng_btn_eng: 'English',
      lng_btn_esp: 'Español',
      simple_manage: 'Simple Food Cost Management',
      log_in: 'Log In',
      create_acc: 'Create a Free Account',
      username: 'Username',
      password: 'Password',
      new_invoice: 'New to Invoice IQ?',
      title: 'Create an account',
      owner: 'Owner',
      other: 'Other',
      continue: 'Continue',
      fname: 'First name',
      lname: 'Last name',
      phone: 'Mobile Phone Number',
      iam: 'I am a ...'
    });
    $translateProvider.translations('es', {
      turn: 'Para Empleados <Br> de Restaurantes!',
      lng_btn_esp: 'Español',
      lng_btn_eng: 'English',
      simple_manage: 'Maneja fácilmente los costos <Br> de los alimentos',
      log_in: 'Entrar',
      username: 'Teléfono Celular',
      password: 'Contraseña',
      create_acc: 'Crea Una Cuenta Gratis',
      new_invoice: 'Eres nuevo en Invoice IQ?',
      title: 'Crea tu cuenta',
      owner: 'Dueño',
      other: 'Otro',
      fname: 'Nombre',
      lname: 'Apellido',
      phone: 'Teléfono Celular',
      continue: 'Continuar',
      iam: 'Yo soy ...'

    });
    $translateProvider.preferredLanguage('en');

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true
    //templateUrl: "templates/menu.html"
    //controller: 'AppCtrl'
  })
    .state('app.dashboard', {
    url: "",
    //abstract: true,
      views: {
        '@': {
          templateUrl: "templates/wrapper.html",
          controller: 'AppCtrl'
        },
        'menu@app.dashboard': {
          templateUrl: "templates/menu.html"
        }
      },
      data: {
        requiresLogin: true
      }
  })

  .state('app.dashboard.search', {
    url: "/search",
    views: {
      'content@app.dashboard': {
        templateUrl: "templates/search.html"
      }
    }

  })

  .state('app.dashboard.browse', {
    url: "/browse",
    views: {
      'content@app.dashboard': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.dashboard.playlists', {
      url: "/playlists",
      views: {
        'content@app.dashboard': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.login', {
      url: "/login",
      views: {
        '@': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })
    .state('app.signup', {
      url: "/signup",
      views: {
        '@': {
          templateUrl: "templates/signup.html",
          controller: 'SignupCtrl'
        }
      }
    })

  .state('app.dashboard.single', {
    url: "/playlists/:playlistId",
    views: {
      'content@app.dashboard': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
