angular.module('app')
.controller('AddController', ['FunThings', function(FunThings){
const self = this;

  self.Blast;

  self.addBlast = function(blast) {
    FunThings.addBlast({description: blast});
    self.Blast = '';
  }

}])
