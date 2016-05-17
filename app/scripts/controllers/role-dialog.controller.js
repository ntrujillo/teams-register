(function(angular){
    'use strict';

angular.module('TeamsApp').controller('RoleDialogCtrl',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'RoleResource',
        function($scope, $stateParams, $modalInstance, entity, RoleResource) {



        $scope.initData = function(id) {
            RoleResource.get({id : id}, function(result) {
                $scope.role = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:roleUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.role._id != null) {
                RoleResource.update({id:$scope.role._id}, $scope.role, onSaveFinished);
            } else {
                RoleResource.save($scope.role, onSaveFinished);
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