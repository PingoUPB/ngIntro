var introApp = angular.module('introApp', []);

introApp.controller('IndexCtrl', function ($scope, $http, Survey) {
    $scope.foo = "";
    $scope.options = [];
    $scope.form = {
        option: null
    };
    $scope.success = false;
    $scope.error = false;

    Survey.get.then(function(response) {
        $scope.foo = response.data.name;
        $scope.options = response.data.options;
        console.log(response);
    },function(response){
        alert("Error");
        console.log(response);
    });

    $scope.vote = function(form){
        if(form.option !== null){
           Survey.post(form).then(function(response) {
                $scope.success = true;
                $scope.error = false;
            });
        } else{
            $scope.error = true;
        }
    };


});

introApp.factory('Survey', function($http) {
    var survey = {}; 
    survey.get = $http({
        method: 'GET',
        url: '/survey1.json'
    });
    survey.post = function(form){ 
        return $http({
            method: 'GET',
            url: '/vote.json',
            data: form
        });
    };
    return survey;
});
