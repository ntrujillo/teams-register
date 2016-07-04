(function(angular){
    'use strict';


angular.module('TeamsApp')
    .controller('ProvinciaDetailCtrl',['ProvinciaResource', 'ProvinciaCantonResource','$uibModal', '$filter' ,'$stateParams',
        function (ProvinciaResource, ProvinciaCantonResource, $modal , $filter,$stateParams) {
        var ctrl = this;        

        function loadData(page) {
            ProvinciaResource.get({id:$stateParams.id},function(result){
                ctrl.provincia = result;
            });            
        };
               
        function showModal(selectedCanton) {

                var modalInstance = $modal.open({
                  templateUrl: 'views/canton-dialog.html',
                  controller: 'CantonDialogCtrl as ctrl',
                  size: 'sm',
                  backdrop: 'static',
                  animation: true,
                  resolve : {
                    entity : function(){
                        return selectedCanton;
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'canton-dialog-dialog',
                                    files: [                                      
                                        'scripts/services/canton.service.js',
                                        'scripts/controllers/canton-dialog.controller.js'                                        
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

       
        var gridDataSource = new kendo.data.DataSource({
            pageSize: 5,
            serverPaging:true,       
            transport: {
            read: function(options) {
                if (angular.isDefined(options.data)) {                 
                    var promise = ProvinciaCantonResource.query({id_provincia: $stateParams.id, 
                        page: (options.data.skip/options.data.pageSize)+1, per_page: options.data.pageSize},
                        function(result, headers){                          
                            options.success({"data":result,"total":headers('X-Total-Count')}); 
                    });                                              
                   
                };
                if (promise === false) {
                    options.error({                        
                        xhr: {}
                    });
                };
            }, 
            create: function(options) {
                var model = options.data;  
                delete model._id;
                ProvinciaCantonResource.save({id_provincia:$stateParams.id}, model, function(response) {                       
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(model);
                    }
                },function(error){
                    console.log("Save error ",error);
                });
            },           
            destroy: function(options) {
                var model = options.data;               
                var promise = ProvinciaCantonResource.delete({id_provincia: $stateParams.id,id: model._id},function(response) {    
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(new Error('DeletingError'));
                    }
                });                   
            },
            update: function(options) {
                var model = options.data;             
                var promise = ProvinciaCantonResource.update({id_provincia: $stateParams.id, id:model._id}, model, function(response) {    
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(model);
                    }
                });             
            }                                          
        },
        schema: {
            total: function(response){
                return response.total;
            },
            data:function(response){
                
                return response.data;
            },
            model:{
                id:"_id",
                fields: {
                    code:{nullable:false},
                    name:{editable:true}
                }
            }
            
        },
        error: function(e) {
                    if (e.xhr.message && e.xhr.message == 'DeletingError') {
                        console.log("Error",e);
                    }
        }
    });

        var gridColumns = [  
            {
                field: "code",
                title: 'Codigo',
                width: "10%"                                     
            }, 
            {
                field: "name",
                title: 'Name',
                width: "80%"                                     
            }, 
            { command: [{
                id: "edit",
                name: "edit",
                template: "<a class='k-button k-grid-edit' href='' style='min-width:16px;'><span class='k-icon k-edit'></span></a>"
                },
                {
                id: "destroy",
                name: "destroy",
                template: "<a class='k-button k-grid-delete' href='' style='min-width:16px;'><span class='k-icon k-delete'></span></a>"
                }], title: "&nbsp;", width: "10%" }];
             
        var toolbar = [ { name: "create", text: $filter('translate')('canton.home.createLabel') }/*,
            { template: "<input type='button' class='k-button' value='Email Users' onclick='sendEmail()' />",
              imageclass: "k-icon k-i-pencil" }*/]


        ctrl.toolbar = toolbar;
        ctrl.gridDataSource = gridDataSource;
        ctrl.gridColumns = gridColumns;                
        ctrl.showModal = showModal;
        loadData();
      
    }]);
}(window.angular));