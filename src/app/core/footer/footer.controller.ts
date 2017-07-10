class FooterController implements ng.IController {
    // Controller dependency injection
    static $inject: ReadonlyArray<string> = [
        '$sce'
    ];

    // Controller properties
    footerMessage: string;

    // Controller constructor
    constructor(private $sce: ng.ISCEService) {
        let $ctrl = this;

        $ctrl.footerMessage = $ctrl.getFooterMessage($sce);
    }

    private getFooterMessage($sce: ng.ISCEService): string {
        return $sce.trustAsHtml(`Copyright @ Flying Spaghetti Monster ; Powered by The Dudes`);
    }
}

angular.module('voya')
    .controller('footerController', FooterController);