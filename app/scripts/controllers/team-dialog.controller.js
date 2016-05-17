(function(angular){
    'use strict';

angular.module('TeamsApp').controller('TeamDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'TeamResource',
        function($scope, $stateParams, $modalInstance, entity, TeamResource) {



        $scope.initData = function(id) {
            TeamResource.get({id : id}, function(result) {
                $scope.team = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:teamUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.team._id != null) {
                TeamResource.update({id:$scope.team._id}, $scope.team, onSaveFinished);
            } else {
                TeamResource.save($scope.team, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };

        if(entity){
            $scope.initData(entity._id);
        }
        
}]);
}(window.angular));