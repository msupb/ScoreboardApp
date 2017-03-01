// Scoreboard / Main controller
app.controller('scoreboardCtrl', ['$http', '$scope', '$route', function($http, $scope, $route){
  // Get all scoreboards data
  $http.get('/api/scoreBoard')
  .success(function(data){
    $scope.boardData = data;
  });

  // Track current tab
  $scope.$route = $route;

  // Sorting tables
  $scope.sortType = 'name';
  $scope.sortReverse = false;
}]);
