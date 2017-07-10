function homeStatesConfiguration($stateProvider: any):void {
    $stateProvider.state('home', {
        parent: 'root',
        url: '',
        views: {
            'content@': {
                controller: 'homeController',
                controllerAs: '$ctrl',
                templateUrl: './app/home/home.html'
            }
        }
    });
}

homeStatesConfiguration.$inject = [
    '$stateProvider'
];

angular.module('voya')
    .config(homeStatesConfiguration);