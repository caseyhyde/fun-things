angular.module('app')
.controller('AddController', ['FunThings', '$location', 'focus', '$scope', addCtrl]);

function addCtrl(FunThings, $location, focus, $scope){
  const self = this;

  focus('addDescription')
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
}

