var introApp = angular.module('introApp', []);

introApp.controller('IndexCtrl', function ($scope, Survey) {
    $scope.name = "";
    $scope.options = [];
    $scope.type = "";
    $scope.form = {
        option: null,
        options: []
    };
    $scope.success = false;
    $scope.error = false;

    Survey.get.then(function(response) {
        $scope.name = response.data.name;
        $scope.type = response.data.type;
        $scope.max_answers = response.data.max_answers;
        $scope.options = response.data.options;
        console.log(response);
    },function(response){
        alert("Error");
        console.log(response);
    });

    $scope.vote = function(form){
        console.log(form);
        var cleanoptions = [];
        if($scope.type === "text")
            cleanoptions = form.options.filter(function(element){
                return element !== undefined && element.length > 0;
            });
        if($scope.type === "single" && form.option !== null
            || $scope.type === "multi" && form.options.length > 0
            || $scope.type === "number" && !isNaN(parseFloat(form.option))
            || $scope.type === "text" && cleanoptions.length > 0){
            form.options = cleanoptions;
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

    var surveys = ['survey1', 'survey2', 'survey3', 'survey4'];
    var random = surveys[Math.floor(Math.random()*surveys.length)];

    var survey = {}; 
    survey.get = $http({
        method: 'GET',
        url: '/' + random + '.json'
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

introApp.controller('InputCtrl', function ($scope) {
    $scope.form.options = [""];
    $scope.add = function(){
        $scope.form.options.push("");
    };

    $scope.remove = function(index){
        $scope.form.options.splice(index, 1);
    };
});
