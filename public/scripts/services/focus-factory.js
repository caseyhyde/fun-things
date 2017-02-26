angular.module('app')
.factory('focus',['$rootScope', '$timeout',  focus]);

function focus($rootScope, $timeout) {
  return function(name) {
    $timeout(function broadcastEvent() {
      $rootScope.$broadcast('focusOn', name);
    });
  };
}
