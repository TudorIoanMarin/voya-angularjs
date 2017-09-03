webpackJsonp([0],{

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function setupUiRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/not-found');
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
function logHttpInterceptor($log) {
    return {
        request: function (config) {
            $log.debug("The app has requested <b>" + config.url + "</b>.");
            return config;
        }
    };
}
logHttpInterceptor.$inject = [
    '$log'
];
function setupHttpInterceptors($httpProvider) {
    $httpProvider.interceptors.push(logHttpInterceptor);
}
function moduleConfiguration($httpProvider, $stateProvider, $urlRouterProvider) {
    setupUiRouter($stateProvider, $urlRouterProvider);
    setupHttpInterceptors($httpProvider);
}
moduleConfiguration.$inject = [
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider'
];
var voyaApp = angular.module('voya', [
    'ngCacheBuster',
    'angular-websocket',
    'ui.router'
]);
voyaApp.config(moduleConfiguration);
var FooterController = (function () {
    function FooterController($sce) {
        this.$sce = $sce;
        var $ctrl = this;
        $ctrl.footerMessage = $ctrl.getFooterMessage($sce);
    }
    FooterController.prototype.getFooterMessage = function ($sce) {
        return $sce.trustAsHtml("Copyright @ Flying Spaghetti Monster ; Powered by The Dudes");
    };
    FooterController.$inject = [
        '$sce'
    ];
    return FooterController;
}());
angular.module('voya')
    .controller('footerController', FooterController);
var NavbarController = (function () {
    function NavbarController() {
    }
    NavbarController.$inject = [];
    return NavbarController;
}());
angular.module('voya')
    .controller('navbarController', NavbarController);
var NotFoundController = (function () {
    function NotFoundController() {
    }
    NotFoundController.$inject = [];
    return NotFoundController;
}());
angular.module('voya')
    .controller('notFoundController', NotFoundController);
var HomeController = (function () {
    function HomeController() {
    }
    HomeController.$inject = [];
    return HomeController;
}());
angular.module('voya')
    .controller('homeController', HomeController);
function homeStatesConfiguration($stateProvider) {
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


/***/ })

},[130]);