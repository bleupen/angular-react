class FooCtrl {
    constructor(hello) {
        this.hello = hello;
    }

    $onInit() {
        this.value = this.hello(this.name);
    }
}

angular.module('informer')
    .component('ngFoo', {
        templateUrl: '/informer/foo-tpl.html',
        bindings: {
            name: '<'
        },
        controller: FooCtrl
    });