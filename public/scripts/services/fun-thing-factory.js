angular.module('app')
    .factory('FunThings', ['$http', funThings]);

function funThings($http) {

    var index = 0;
    var blasts = [];

    //current blast
    var current= {
      blast: null
    };

    //show fun things
    var explain = {
        boolean: true
    };

    getThings();

    //next blast
    function nextBlast() {
        // increment index until looping back to position 0
        index = ++index % blasts.length;
        current.blast = blasts[index];
        console.log("current.blast", current.blast);
    }
  
    //get the blasts
    function getThings() {
        console.log('getting things..');
        return $http({
            method: 'GET',
            url: '/random'
        }).then(function(response) {
            console.log("getThings() response: ", response);
            blasts = response.data;
            current.blast = blasts[index];
        })
        .catch(function (err) {
          console.log('GET things error:', err);
        });
    };

    //add a blast
    function addBlast(data) {
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

  return {
    current: current,
    explain: explain,
    nextBlast: nextBlast,
    getThings: getThings,
    addBlast: addBlast
  };
}

