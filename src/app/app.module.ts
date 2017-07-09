function setupUiRouter($stateProvider: any, $urlRouterProvider: any):void {
    // Redirect all to root
    $urlRouterProvider.otherwise('/not-found');

    // Root state
    $stateProvider.state('root', {
        abstrct: true,
        views: {
            'navbar@': {
                controller: 'navbarController',
                templateUrl: './app/core/navbar/navbar.html'
            },
            'content@': {
                controller: 'contentController',
                templateUrl: './app/core/content/content.html'
            },
            'footer@': {
                controller: 'footerController',
                templateUrl: './app/core/footer/footer.html'
            }
        }
    });
}

function logHttpInterceptor($log: any): any {
    return {
        request: (config: any): any => {
            $log.debug(`The app has requested <b>${config.url}</b>.`);

            return config;
        }
    };
}

logHttpInterceptor.$inject = [
    '$log'
];

function setupHttpInterceptors($httpProvider: any): void {
    $httpProvider.interceptors.push(logHttpInterceptor);
}

function moduleConfiguration (
    $httpProvider: any,
    $stateProvider: any,
    $urlRouterProvider: any
):void {
    setupUiRouter($stateProvider, $urlRouterProvider);
    setupHttpInterceptors($httpProvider);
}

moduleConfiguration.$inject = [
    '$stateProvider'
];

let voyaApp: ng.IModule = angular.module('voya', [
    'ngCacheBuster',
    'angular-websocket'
]);

voyaApp.config(moduleConfiguration);