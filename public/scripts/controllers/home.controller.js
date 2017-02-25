angular.module('app')
.controller('HomeController', ['FunThings', '$http', function(FunThings, $http){
  console.log("hc running");
  console.log(FunThings)
const self = this;
self.currentBlast = FunThings.currentBlast
self.nextBlast = FunThings.nextBlast
self.explain = FunThings.explain;

self.explainButton = function(){
  FunThings.getThings().then(function() {
    self.currentBlast = FunThings.currentBlast;
  })
  FunThings.explain.boolean = false;
}


}])
