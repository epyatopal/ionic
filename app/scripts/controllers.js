angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | ngEurope Sample' ;
    }
  });

  // Triggered in the login modal to close it
  //$scope.closeLogin = function() {
  //  $scope.modal.hide();
  //};

  // Open the login modal
  //$scope.login = function() {
  //  $scope.modal.show();
  //};

  // Perform the login action when the user submits the login form

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SignupCtrl', function($scope) {
    $scope.activeOwner = true;
    $scope.activeManager = false;
    $scope.activeChef = false;
    $scope.activeOther = false;

    $scope.checkRole = function(type){
      $scope.activeOwner = false;
      $scope.activeManager = false;
      $scope.activeChef = false;
      $scope.activeOther = false;
      $scope[type] = true;
    }


})

.controller('LoginCtrl', function($scope, $translate, $http, store, $state) {
    $scope.activeEnglish = true;

    $scope.changeLanguage = function (key) {
      $scope.activeEnglish = !$scope.activeEnglish;
      $translate.use(key);
    };

    $scope.loginData = {};

    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $http({
        //url: 'http://192.168.88.225:3000/api/login',
        url: 'https://ionic-server.herokuapp.com/api/login',
        method: 'POST',
        data: $scope.loginData
      //  headers: {'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      //'Access-Control-Allow-Headers': 'Authorization'}
        //headers: {'Content-Type': 'application/json', Accept: 'application/json'}
      }).then(function(response) {
        store.set('jwt', response.data.token);
        $state.go('app.dashboard.search');
      }, function(error) {
        console.log(error);
      });
    };

});
