'use strict';

/**
 * @ngdoc overview
 * @name gruntAngularApp
 * @description
 * # gruntAngularApp
 *
 * Main module of the application.
 */
angular
  .module('app', ['ngRoute', 'ngMaterial', 'ngTouch', 'ngSwippy'])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider, $logProvider) {

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('red')
    //   .accentPalette('blue')
    //   .warnPalette('yellow')
    //   .dark();

    $locationProvider.html5Mode(false).hashPrefix('');

    $logProvider.debugEnabled(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/templates/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/add', {
        templateUrl: 'views/templates/add.html',
        controller: 'AddController',
        controllerAs: 'add'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
