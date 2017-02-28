angular.module('app')
  .factory('FunThings', ['$http', '$q', '$log', funThings]);

function funThings($http, $q, $log) {

  var index = 0;
  var blasts = [];
  var allBlasts = {
    theBlasts: blasts
  }
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
  }

  //get the blasts
  function getThings() {
    $log.debug('getting things..');
    return $http({
      method: 'GET',
      url: '/random'
    })
      .then(setBlasts)
      .catch( function handleError(err) {
        console.log(err.data);
      });
  }

  function setBlasts(response) {
    $log.debug("getThings() response: ", response);
    blasts = response.data;
    current.blast = blasts[index];
    allBlasts.theBlasts = response.data;

  }

  //add a blast
  function addBlast(data) {
    return $http({
      method: 'POST',
      url: '/things',
      data: data
    })
      .then(pushNewBlast)
      .catch(sendError);
  };

  function pushNewBlast(response) {
    return blasts.push(response.config.data);
  }


  function sendError(err) {
    return $q.reject('POST thing error');
  }

  return {
    current: current,
    explain: explain,
    nextBlast: nextBlast,
    getThings: getThings,
    addBlast: addBlast,
    allBlasts: allBlasts
  };
}
