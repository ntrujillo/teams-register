(function(angular) {
  'use strict';

  angular.module('TeamsApp')
    .controller('PlayerCtrl',['$uibModal', 'PlayerResource', function($modal, PlayerResource) {

       var ctrl = this;
        ctrl.registros = [];
        ctrl.pageno = 1;        
        ctrl.total_count = 0;
        ctrl.itemsPerPage = 5;      









        function loadData(page) {
            PlayerResource.query({page: page, per_page: ctrl.itemsPerPage,q:ctrl.filter}, function(result, headers) {                
                ctrl.registros = result;
                ctrl.total_count = headers('X-Total-Count');
                
            });
        };         

        function _delete(id) {
            PlayerResource.get({id: id}, function(result) {
                ctrl.registro = result;
                $('#deleteRegistroConfirmation').modal('show');
            });
        };

       function confirmDelete(id) {
            PlayerResource.delete({id: id},
                function () {
                    ctrl.refresh();
                    $('#deleteRegistroConfirmation').modal('hide');                    
                });
        };

        function refresh() {           
            ctrl.loadData(ctrl.pageno);          
        };    

        
        ctrl.refresh = refresh;       
        ctrl.confirmDelete = confirmDelete;
        ctrl.deleteRegistro = _delete;      
        ctrl.loadData = loadData;
        ctrl.refresh();   

    
    }]);
}(window.angular));
