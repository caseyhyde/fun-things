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
  .module('app', ['ngRoute', 'ngMaterial'])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('red')
    //   .accentPalette('blue')
    //   .warnPalette('yellow')
    //   .dark();

    $locationProvider.html5Mode(false).hashPrefix('');

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
