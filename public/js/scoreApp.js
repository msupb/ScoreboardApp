// Application name
var app = angular.module('scoreApp', ['ngRoute']);

// View routing between each html page
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'page/home.html',
    activeTab : 'home'
  })
  .when('/scoreboards', {
    templateUrl : 'page/scoreboards.html',
    activeTab : 'scoreboards',
    controller : 'scoreboardCtrl'
  })
  .when('/scoreboards/:id', {
    templateUrl : 'page/view.html',
    activeTab : 'scoreboards',
    controller : 'viewCtrl'
  })
  .when('/scoreboards/:id/edit', {
    templateUrl : 'page/edit.html',
    activeTab : 'scoreboards',
    controller : 'editCtrl'
  })
  .when('/create', {
    templateUrl : 'page/create.html',
    activeTab : 'create',
    controller : 'createCtrl'
  })
  .otherwise({
    redirectTo : '/'
  });
});
