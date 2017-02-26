angular.module('app')
  .controller('HomeController', ['FunThings', '$http', function(FunThings, $http){
    console.log("hc running");
    const self = this;
    self.current = FunThings.current;
    self.nextBlast = FunThings.nextBlast;
    self.explain = FunThings.explain;

    self.explainButton = function(){
      FunThings.explain.boolean = false;
    }


  }])
