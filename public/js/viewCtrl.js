// View controller --> View a specific scoreboard
app.controller('viewCtrl', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location){
  $http.get('/api/scoreBoard/' + $routeParams.id)
  .success(function(data){
    $scope.data = data;
  })
  .error(function(data){
    console.log('Error: ' + data);
  });


  // Show verification modal when trying to delete a scoreboard
  $scope.verifyDelete = function(){
    $('#verifyModal').appendTo("body").modal('show');
  };


  // Delete a scoreboard from the database
  $scope.deleteScoreboard = function(data){
    $http.delete('/api/scoreBoard/' + $routeParams.id)
    .success(function(){
      $scope.deleteResult = 'Scoreboard was successfully deleted!';
      $location.path('/scoreboards');
    })
    .error(function(){
      $scope.deleteResult = 'Scoreboard failed to be deleted!';
    });

    // Show the final modal with the result
    $('#deletedModal').appendTo("body").modal('show');
  };
}]);
