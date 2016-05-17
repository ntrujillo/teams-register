(function(angular){
  'use strict';

angular.module('TeamsApp')
    .factory('PlayerResource', function ($resource) {
        return $resource('/api/player/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
}(window.angular));