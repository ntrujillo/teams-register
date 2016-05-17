(function(angular){
	'use strict';
angular.module('TeamsApp')
    .controller('MenuCtrl',['$scope', 'MenuResource','$uibModal',function ($scope, MenuResource,$modal) {
               
       $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };     

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
      };

      $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
      };

      $scope.data = [{
        'id': 1,
        'title': 'Inicio' ,
        'nodes' : []      
      }, {
        'id': 2,
        'title': 'Registro De Votos',
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'nodes' : []
      }, {
        'id': 3,
        'title': 'Resultados',
        'nodes': [
          {
            'id': 31,
            'title': 'node3.1',
            'nodes': []
          }
        ]
      },{
        'id': 4,
        'title': 'Reportes',
        'nodes': [
          {
            'id': 41,
            'title': 'Conteo de Votos',
            'nodes': []
          }
        ]
      },
      {
        'id': 5,
        'title': 'Entidades',
        'nodes': [
          {
            'id': 51,
            'title': 'Conteo de Votos',
            'nodes': []
          }
        ]
      }];   

    }]);
}(window.angular));