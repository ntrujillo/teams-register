(function(angular){
    'use strict';


angular.module('TeamsApp')
    .controller('TeamCtrl',['TeamResource','$uibModal',function (TeamResource,$modal) {
        var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;  


        function loadData(page) {
            TeamResource.query({page: page, per_page: ctrl.itemsPerPage,q:ctrl.filter}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
                console.log('Teams',ctrl.registros);
            });
        };         

        function _delete(id) {
            TeamResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            TeamResource.delete({id: id},
                function () {
                    ctrl.refresh();
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {           
            ctrl.loadData(ctrl.pageno);          
        };    

        function showModal(selectedTeam) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/team-dialog.html',
                  controller: 'TeamDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedTeam;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'team-dialog',
                                    files: [                                      
                                        'scripts/services/team.service.js',
                                        'scripts/controllers/team-dialog.controller.js'                                        
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
        ctrl.refresh = refresh;       
        ctrl.confirmDelete = confirmDelete;
        ctrl.deleteRegistro = _delete;     
        ctrl.showModal = showModal;
        ctrl.loadData = loadData;
        ctrl.refresh();
    }]);
}(window.angular));