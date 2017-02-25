angular.module('app')
.controller('HomeController', ['FunThings', function(FunThings){
const self = this;
self.currentBlast = FunThings.currentBlast
self.nextBlast = FunThings.nextBlast
self.explain = FunThings.explain;

self.explainButton = function(){
  FunThings.explain.boolean = false;
}

}])
