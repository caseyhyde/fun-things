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
  .config(function ($routeProvider, $locationProvider) {
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
