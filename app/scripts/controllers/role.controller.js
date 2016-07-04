(function(angular){
    'use strict';


angular.module('TeamsApp')
    .controller('RoleCtrl',['RoleResource','$uibModal', '$filter' ,
        function (RoleResource, $modal , $filter) {
        var ctrl = this;     
         
        var gridDataSource = new kendo.data.DataSource({
            pageSize: 5,
            serverPaging:true,       
            transport: {
            read: function(options) {
                if (angular.isDefined(options.data)) {                 
                    var promise = RoleResource.query({page: (options.data.skip/options.data.pageSize)+1, per_page: options.data.pageSize},
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
                RoleResource.save(model, function(response) {                       
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
                var promise = RoleResource.delete({id: model._id},function(response) {    
                    if(response){                                                                       
                         options.success(model);                                    
                    }else{
                         options.error(new Error('DeletingError'));
                    }
                });                   
            },
            update: function(options) {
                var model = options.data;             
                var promise = RoleResource.update({id:model._id}, model, function(response) {    
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
                    name:{nullable:false},
                    active:{editable:true},
                    description:{editable:true}
                }
            }
            
        },
        error: function(e) {
                    if (e.xhr.message && e.xhr.message == 'DeletingError') {
                        console.log("Error",e);
                    }
        }
    });
    
    var grid = {
                control: function(container, options) {
                    var controlInput = $('<input />', {
                        name: options.field,
                        'data-bind': "value:" + options.field,
                        'ng-disabled': "false",
                        'ng-show': "true",
                        'ng-readonly': "false",
                        'id': "VA_LEMYPOUTIW4503_DIOT879",
                        'type': "checkbox",
                        "class" : "checkbox",
                        'ng-model': 'dataItem.active',                                                          
                        'data-value-primitive': "true"
                    });
                    controlInput.appendTo(container);
                }
        };

    var gridColumns = [  
            {
                field: "name",
                title: 'Name',
                width: "10%"                                     
            }, 
            {
                field: "active",
                title: 'Actvie',
                width: "5%" ,
                editor: grid.control,
                template: '<input type="checkbox" #= active ? \'checked="checked"\' : "" # class="chkbx" />'                                    
            },  
            {
                field: "description",
                title: 'Description',
                width: "70%"                                     
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
                }], title: "&nbsp;", width: "15%" }];
             
        var toolbar = [ { name: "create", text: $filter('translate')('role.home.createLabel') }/*,
            { template: "<input type='button' class='k-button' value='Email Users' onclick='sendEmail()' />",
              imageclass: "k-icon k-i-pencil" }*/]


        ctrl.toolbar = toolbar;
        ctrl.gridDataSource = gridDataSource;
        ctrl.gridColumns = gridColumns;          
      
  
    }]);
}(window.angular));