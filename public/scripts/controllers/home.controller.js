angular.module('app')
.controller('HomeController', ['FunThings', function(FunThings){
const self = this;
self.currentBlast = FunThings.currentBlast
self.nextBlast = FunThings.nextBlast
self.explain = true;

self.explainButton = function(){
  self.explain = false;
}
}])
