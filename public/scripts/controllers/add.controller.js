angular.module('app')
.controller('AddController', ['FunThings', '$location', function(FunThings, $location){
const self = this;

  self.blast;

  self.addBlast = function(blast) {
    FunThings.addBlast({description: blast});
    self.Blast = '';
    $location.path('/');
  };

}])
