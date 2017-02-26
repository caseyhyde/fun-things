angular.module('app')
.controller('AddController', ['FunThings', '$location', function(FunThings, $location){
const self = this;

  self.blast = '';

  self.addBlast = function(blast) {
    FunThings.addBlast({description: blast})
    .catch(handleError)
    .finally(function () {
      self.Blast = '';
      $location.path('/');
    });
  };

  function handleError(err) {
    console.log('addBlast error:', err);
  }

}])
