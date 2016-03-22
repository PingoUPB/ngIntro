var introApp = angular.module('introApp', []);

introApp.controller('IndexCtrl', function ($scope, $http) {
    $scope.foo = "";
    $scope.options = [];
    $scope.form = {
        option: null
    };
    $scope.success = false;
    $scope.error = false;

    var foo = $http({
        method: 'GET',
        url: '/survey1.json'
    });

    foo.then(function(response) {
        $scope.foo = response.data.name;
        $scope.options = response.data.options;
        console.log(response);
    },function(response){
        alert("Error");
        console.log(response);
    });

    $scope.vote = function(form){
        if(form.option !== null){
            $http.get('/vote.json',form).then(function(response) {
                $scope.success = true;
                $scope.error = false;
            });
        } else{
            $scope.error = true;
        }
    };


});
