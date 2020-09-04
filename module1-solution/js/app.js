(function(){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
    $scope.name="";
    $scope.message=""; 
    $scope.lunchCheck = function (){
        var words = $scope.name.split(',');
        var len = 0;
        for (var i = 0; i < words.length; i++) {
             if( (words[i]!== " ") && (words[i]!=="") ){
                len++;
             }
        }

        if( len === 0 ){
            $scope.message = "Please enter data first";
        }
        else if (len < 4){
            $scope.message = "Enjoy!";
        }
        else{
            $scope.message = "Too much!";
        }
    }
}
})();