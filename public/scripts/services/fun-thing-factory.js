angular.module('app')
    .factory('FunThings', ['$http', createFactory]);

function FunThings($http) {
    var self = this;

    var index = 0;
    console.log("index", index);
    var blasts = [];

    //current blast
    self.currentBlast = {};

    //next blast
    function nextBlast() {
        // increment index until looping back to position 0
        index = ++index % blasts.length;
        this.currentBlast = blasts[index];
        console.log("currentBlast", this.currentBlast);
    }
    this.nextBlast = nextBlast;
    //get the blasts
    this.getThings = function() {
        console.log('getting things..');
        return $http({
            method: 'GET',
            url: '/random'
        }).then(function(response) {
            console.log("getThings() response: ", response);
            blasts = response.data;
            self.currentBlast = blasts[index];
            nextBlast();
        });
    };
    //add a blast
    this.addBlast = function(data) {
        $http({
            method: 'POST',
            url: '/things',
            data: data
        }).then(function(response) {
            blasts.push(data);
        }).catch(function(err) {
            console.log('POST thing error');
        });
    };
    //show fun things

    this.explain = {
        boolean: true
    };
    this.getThings();
}

function createFactory($http) {
    var things = new FunThings($http);
    return things;
}
