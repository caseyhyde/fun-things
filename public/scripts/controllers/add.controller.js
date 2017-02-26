angular.module('app')
.controller('AddController', ['FunThings', function(FunThings){
const self = this;

  self.blast;

  self.addBlast = function(blast) {
    FunThings.addBlast({description: blast});
    self.Blast = '';
  }

}])
