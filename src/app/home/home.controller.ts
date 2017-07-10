class HomeController implements ng.IController {
    // Controller dependency injection
    static $inject: ReadonlyArray<string> = [

    ];

    // Constroller constructor
    constructor() {

    }
}

angular.module('voya')
    .controller('homeController', HomeController);