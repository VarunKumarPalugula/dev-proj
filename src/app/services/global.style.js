System.register(["@angular/core", "@ngx-translate/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, GlobalStyleComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }
        ],
        execute: function () {
            GlobalStyleComponent = (function () {
                function GlobalStyleComponent(translate) {
                    this.translate = translate;
                    this.currStyle = 0;
                    this.layoutDirection = "";
                    this.isLeftDirection = true;
                    //public isIE: boolean = /*@cc_on!@*/false || !!window.document.documentMode;
                    //public isChrome: boolean = !!window.chrome && !!window.chrome.webstore;
                    this.themesSupported = ["blackTheme", "whiteTheme", "darkgraytheme", "bluegreytheme", "cyanambertheme", "teallimetheme"];
                    this.currTheme = this.themesSupported[this.currStyle];
					localStorage.setItem("curntTheme", this.currTheme);
                    //this.isIE = /*@cc_on!@*/false || !!document.documentMode;
                    //this.isChrome = !!window.chrome && !!window.chrome.webstore;
                    //console.log(" globalStyle browser details   isIE:", this.isIE, "  isChrome:",this.isChrome);
                }
                /*
                *	set the layout direction  left/right
                */
                GlobalStyleComponent.prototype.getLayoutDirection = function () {
                    return { 'direction': this.layoutDirection };
                };
                /*
                *	set the language according to selection
                */
                GlobalStyleComponent.prototype.setLocale = function (ilocale) {
                    if (this.layoutDirection == "") {
                        // this language will be used as a fallback when a translation isn't found in the current language
                        this.translate.setDefaultLang("en");
                    }
                    if (ilocale == 'ar') {
                        this.layoutDirection = 'rtl';
                        this.isLeftDirection = false;
                    }
                    else {
                        this.layoutDirection = 'ltr';
                        this.isLeftDirection = true;
                    }
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    this.translate.use(ilocale);
                };
                /*
                *	set Panel Body style
                */
                GlobalStyleComponent.prototype.getPanelBodyStyle = function () {
                    if (this.currStyle == 2)
                        return { 'background': 'whitesmoke' };
                    else
                        return { 'background': 'whitesmoke' };
                };
                //End Panel Cs
                // RightNav Css
                GlobalStyleComponent.prototype.getRightNavStyle = function () {
                    if (this.currStyle == 4) {
                        return { 'background': '#0072bc' };
                    }
                    else if (this.currStyle == 3) {
                        return { 'background': '32a6a9' };
                    }
                    else if (this.currStyle == 2) {
                        return { 'background': '#32a6a9' };
                    }
                    else {
                        return { 'background': '#5992dc' };
                    }
                };
                GlobalStyleComponent.prototype.getRightSearchStyle = function () {
                    if (this.currStyle == 1)
                        return { 'color': '#00a4c6' };
                    else if (this.currStyle == 2)
                        return { 'font-family': 'verdana, Helvetica, LATO ', 'font-variant': 'normal' };
                    else { }
                    ;
                };
                GlobalStyleComponent.prototype.gadgetContainerStyle = function () {
                    if (this.currStyle == 4) {
                        return { 'background': '#666666' };
                    }
                    else if (this.currStyle == 2) {
                        return { 'font-family': 'verdana, Helvetica, LATO ' };
                    }
                    else {
                        return { 'background': '#5992dc' };
                    }
                };
                /*
               *set rightnav style
               */
                GlobalStyleComponent.prototype.getGadgetMenuStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': '#32a6a9' };
                    }
                    else {
                        return { 'background': '#5992dc' };
                    }
                };
                /*
                *set rightnav style
                */
                GlobalStyleComponent.prototype.getGadgetSubMenuStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': 'rgb(12, 145, 148)' };
                    }
                    else {
                        return { 'background': '#5992dc' };
                    }
                };
                /*
                *	set rightnav menustyle
                */
                GlobalStyleComponent.prototype.getGadgetTitleStyle = function () {
                    if (this.currStyle == 2)
                        return { 'background': 'rgb(40, 150, 152)' };
                    else
                        return { 'background': '#6e9edc' };
                };
                /*
                *	set the rightnav pannel style
                */
                GlobalStyleComponent.prototype.getGadgetPanelStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': '#f5f5f5', 'border': 'solid 1px #9e9e9e', 'box-shadow': '-2px 2px 1px 0px rgba(158, 158, 158, 0.53)' };
                    }
                    else {
                        return { 'background': '#e3ecf8' };
                    }
                };
                // End Right Nav Cs
                GlobalStyleComponent.prototype.getBodyContentStyle = function () {
                    if (this.currStyle == 3) {
                        return { 'background': '#BDBDBD' };
                    }
                    else if (this.currStyle == 4) {
                        return { 'background': '#666666' };
                    }
                    else if (this.currStyle == 2) {
                        return { 'background': '#17272B' };
                    }
                    else {
                        return { 'background': '#dfe6e8' };
                    }
                };
                GlobalStyleComponent.prototype.setStyleCode = function (styleCode) {
                    this.currStyle = Number(styleCode) - 1;
                    console.log("this.currStyle: " + this.currStyle, this.themesSupported[this.currStyle]);
                    this.currTheme = this.themesSupported[this.currStyle];
					localStorage.setItem("curntTheme", this.currTheme);
                };
                GlobalStyleComponent.prototype.getModuleContentStyle = function () {
                    if (this.currStyle == 3) {
                        return { 'background': '#BDBDBD', 'color': 'rgb(50, 166, 169)' };
                    }
                    else if (this.currStyle == 2) {
                        return { 'background': '#32a6a9', 'color': '#ddd' };
                    }
                    else {
                        return { 'background': '#E0F7FA', 'color': 'rgb(89, 146, 220)' };
                    }
                };
                GlobalStyleComponent.prototype.getModuleHeadingStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'color': 'rgb(50, 166, 169)' };
                    }
                    else {
                        return { 'color': 'rgb(89, 146, 220)' };
                    }
                };
                /*
                * set tab style when its active
                */
                GlobalStyleComponent.prototype.getTabActiveStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': 'rgb(50, 166, 169)', 'border': 'solid 2px rgb(50, 166, 169)' };
                    }
                    else {
                        return { 'background': 'rgb(89, 146, 220)' };
                    }
                };
                /*
                * set tab style when its inactive
                */
                GlobalStyleComponent.prototype.getTabInactiveStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'border': 'solid 2px rgb(50, 166, 169)' };
                    }
                    else {
                        return { 'border': 'solid 2px #8eb8ef' };
                    }
                };
                GlobalStyleComponent.prototype.getTabHoverStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': 'rgb(63, 200, 202)', 'border': 'solid 1px rgb(40, 150, 152)', 'color': 'white' };
                    }
                    else {
                        return { 'background': 'rgba(103, 155, 222, 0.88)', 'border': 'solid 1px #4a73a9', 'color': 'white' };
                    }
                };
                /*
                * set tab Background style
                */
                GlobalStyleComponent.prototype.getTabNavStyle = function () {
                    return { 'background': 'transparent' };
                };
                // tab  css end
                GlobalStyleComponent.prototype.getButtonStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': 'rgb(50, 166, 169)', 'border': 'solid 1px rgb(50, 166, 169)' };
                    }
                    else {
                        return { 'background': '#5992dc', 'border': 'solid 1px #709fdc' };
                    }
                };
                GlobalStyleComponent.prototype.getButtonHoverStyle = function () {
                    if (this.currStyle == 2) {
                        return { 'background': 'rgb(40, 150, 152)', 'border': 'solid 1px rgb(40, 150, 152)' };
                    }
                    else {
                        return { 'background': '#4a73a9', 'border': 'solid 1px #4a73a9' };
                    }
                };
                GlobalStyleComponent = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof core_2.TranslateService !== "undefined" && core_2.TranslateService) === "function" && _a || Object])
                ], GlobalStyleComponent);
                return GlobalStyleComponent;
                var _a;
            }());
            exports_1("GlobalStyleComponent", GlobalStyleComponent);
        }
    };
});
//# sourceMappingURL=global.style.js.map