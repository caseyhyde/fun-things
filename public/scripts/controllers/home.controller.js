angular.module('app')
.controller('HomeController', ['FunThings', '$http', function(FunThings, $http){
const self = this;
self.currentBlast = FunThings.currentBlast
self.nextBlast = FunThings.nextBlast
self.explain = true;

self.explainButton = function(){
  self.explain = false;
}

self.test = function() {
  $http({
    method: 'GET',
    url: '/things',
  }).then(function(response) {
    console.log("response: ", response);
  })
}
}])
