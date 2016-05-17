(function(angular) {
  'use strict';
  angular.module('TeamsApp').controller('PlayerDialogCtrl', ['$scope','$uibModal', '$stateParams', 'entity', 'PlayerResource',
    function($scope, $modal, $stateParam,  entity, Service) {

      
    
       $scope.showModal = function() {

                var modalInstance = $modal.open({
                  templateUrl: 'views/modal-photo.html',
                  controller: 'ModalPhotoController as ctrl',
                  size: 'md',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                    name: 'modal-photo',
                                    files: [
                                        'scripts/controllers/modal-photo.controller.js'                                        
                                    ]
                                }])
                          }]
                      }                  
                });

                modalInstance.result.then(function(obj) {
                  ctrl.result = obj;
                  ctrl.refresh()
                });
        };  

       $scope.initData = function(id) {
            Service.get({id : id}, function(result) {
                $scope.player= result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('fimepedApp:playerUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.player_id != null) {
                Service.update({id:$scope.player._id}, $scope.player, onSaveFinished);
            } else {
                Service.save($scope.player, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };

        if(entity){
            $scope.initData(entity._id);
        };
    }]);
}(window.angular));
