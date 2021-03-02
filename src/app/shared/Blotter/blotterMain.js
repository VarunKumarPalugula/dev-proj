System.register(["@angular/platform-browser-dynamic", "./blotterApp/blotter.module", "@angular/common"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, blotter_module_1, common_1;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (blotter_module_1_1) {
                blotter_module_1 = blotter_module_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            //enableProdMode();
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(blotter_module_1.BlotterModule, [{ provide: common_1.APP_BASE_HREF, useValue: '/ucf/app/shared/Blotter/' }]);
        }
    };
});
//# sourceMappingURL=blotterMain.js.map