function setupUiRouter($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
    // Redirect all to root
    $urlRouterProvider.otherwise('/not-found');

    // Root state
    $stateProvider.state('root', {
        abstract: true,
        views: {
            'navbar@': {
                controller: 'navbarController',
                templateUrl: './app/core/navbar/navbar.html'
            },
            'footer@': {
                controller: 'footerController',
                controllerAs: '$ctrl',
                templateUrl: './app/core/footer/footer.html'
            }
        }
    });
}

function logHttpInterceptor($log: ng.ILogService): ng.IHttpInterceptor {
    return {
        request: (config: ng.IRequestConfig): ng.IRequestConfig => {
            $log.debug(`The app has requested <b>${config.url}</b>.`);

            return config;
        }
    };
}

logHttpInterceptor.$inject = [
    '$log'
];

function setupHttpInterceptors($httpProvider: ng.IHttpProvider): void {
    $httpProvider.interceptors.push(logHttpInterceptor);
}

function moduleConfiguration(
    $httpProvider: ng.IHttpProvider,
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
): void {
    setupUiRouter($stateProvider, $urlRouterProvider);
    setupHttpInterceptors($httpProvider);
}

moduleConfiguration.$inject = [
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider'
];

let voyaApp: ng.IModule = angular.module('voya', [
    'ngCacheBuster',
    'angular-websocket',
    'ui.router'
]);

voyaApp.config(moduleConfiguration);
