var introApp = angular.module('introApp', []);

introApp.controller('IndexCtrl', function ($scope, $http) {
    $scope.foo = "Hello World";

    // $http({
    //     method: 'GET',
    //     url: '/survey1.json'
    // }).then(function(response) {
    //     $scope.foo = response.data.name;
    //     console.log(response);
    // });
});
