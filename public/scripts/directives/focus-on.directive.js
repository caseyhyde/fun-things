angular.module('app')
.directive('focusOn', focusOn);

function focusOn() {
  return function(scope, elem, attr) {
    scope.$on('focusOn', function (e, name) {
      if(name === attr.focusOn) {
        elem[0].focus();
      }
    });
  };
}

