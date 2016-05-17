(function(angular){
  'use strict';

angular.module('TeamsApp')
    .factory('TeamResource', function ($resource) {
        return $resource('/api/team/:id', {}, {
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