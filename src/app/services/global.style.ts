import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class GlobalStyleComponent {

    private currStyle: number = 0;
    public layoutDirection: string = "";
    public isLeftDirection: boolean = true;
    //public isIE: boolean = /*@cc_on!@*/false || !!window.document.documentMode;
    //public isChrome: boolean = !!window.chrome && !!window.chrome.webstore;
    private themesSupported: any = ["blackTheme", "whiteTheme", "darkgraytheme", "bluegreytheme", "cyanambertheme", "teallimetheme"];
    public currTheme: string  = this.themesSupported[this.currStyle]; 

    constructor(private translate: TranslateService) {
        localStorage.setItem("curntTheme", this.currTheme);

        //this.isIE = /*@cc_on!@*/false || !!document.documentMode;
        //this.isChrome = !!window.chrome && !!window.chrome.webstore;
        //console.log(" globalStyle browser details   isIE:", this.isIE, "  isChrome:",this.isChrome);
    }


	/*
	*	set the layout direction  left/right
	*/
    getLayoutDirection() {
        return { 'direction': this.layoutDirection };
    }

	/*
	*	set the language according to selection
	*/
    setLocale(ilocale: string) {
        if (this.layoutDirection == "") {
            // this language will be used as a fallback when a translation isn't found in the current language
            this.translate.setDefaultLang("en");
        }
        if (ilocale == 'ar') {
            this.layoutDirection = 'rtl';
            this.isLeftDirection = false;
        } else {
            this.layoutDirection = 'ltr';
            this.isLeftDirection = true;
        }
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(ilocale);
    }

    /*
    *	set Panel Body style
    */
    getPanelBodyStyle() {
        if (this.currStyle == 2)
            return { 'background': 'whitesmoke' };
        else
            return { 'background': 'whitesmoke' };
    }

    //End Panel Cs



    // RightNav Css
    getRightNavStyle() {
        if (this.currStyle == 4) {
            return { 'background': '#0072bc' };
        } else if (this.currStyle == 3) {
            return { 'background': '32a6a9' };
        } else if (this.currStyle == 2) {
            return { 'background': '#32a6a9' };
        } else {
            return { 'background': '#5992dc' };
        }
    }

    getRightSearchStyle() {
        if (this.currStyle == 1)
            return { 'color': '#00a4c6' };
        else if (this.currStyle == 2)
            return { 'font-family': 'verdana, Helvetica, LATO ', 'font-variant': 'normal' };
        else
        { };
    }

    gadgetContainerStyle() {
        if (this.currStyle == 4) {
            return { 'background': '#666666' };
        } else if (this.currStyle == 2) {
            return { 'font-family': 'verdana, Helvetica, LATO ' };
        } else {
            return { 'background': '#5992dc' };
        }
    }

    /*
   *set rightnav style
   */
    getGadgetMenuStyle() {
        if (this.currStyle == 2) {
            return { 'background': '#32a6a9' };
        } else {
            return { 'background': '#5992dc' };
        }
    }

    /*
    *set rightnav style
    */
    getGadgetSubMenuStyle() {
        if (this.currStyle == 2) {
            return { 'background': 'rgb(12, 145, 148)' };
        } else {
            return { 'background': '#5992dc' };
        }
    }


    /*
    *	set rightnav menustyle
    */
    getGadgetTitleStyle() {
        if (this.currStyle == 2)
            return { 'background': 'rgb(40, 150, 152)' };
        else
            return { 'background': '#6e9edc' };
    }

    /*
    *	set the rightnav pannel style
    */
    getGadgetPanelStyle() {
        if (this.currStyle == 2) {
            return { 'background': '#f5f5f5', 'border': 'solid 1px #9e9e9e', 'box-shadow': '-2px 2px 1px 0px rgba(158, 158, 158, 0.53)' }
        }
        else {
            return { 'background': '#e3ecf8' };
        }
    }
    // End Right Nav Cs

    getBodyContentStyle() {
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

    }

    setStyleCode(styleCode: string) {
        this.currStyle = Number(styleCode)-1;
        console.log("this.currStyle: " + this.currStyle, this.themesSupported[this.currStyle]);
        this.currTheme = this.themesSupported[this.currStyle]; 
        localStorage.setItem("curntTheme", this.currTheme);

    }

    getModuleContentStyle() {
        if (this.currStyle == 3) {
            return { 'background': '#BDBDBD', 'color': 'rgb(50, 166, 169)' };
        }
        else if (this.currStyle == 2) {
            return { 'background': '#32a6a9', 'color': '#ddd' };
        }
        else {
            return { 'background': '#E0F7FA', 'color': 'rgb(89, 146, 220)' };
        }

    }

    getModuleHeadingStyle() {
        if (this.currStyle == 2) {
            return { 'color': 'rgb(50, 166, 169)' };
        } else {
            return { 'color': 'rgb(89, 146, 220)' };
        }

    }

    /*
    * set tab style when its active
    */
    getTabActiveStyle() {
        if (this.currStyle == 2) {
            return { 'background': 'rgb(50, 166, 169)', 'border': 'solid 2px rgb(50, 166, 169)' };
        } else {
            return { 'background': 'rgb(89, 146, 220)' };
        }
    }

    /*
    * set tab style when its inactive
    */
    getTabInactiveStyle() {
        if (this.currStyle == 2) {
            return { 'border': 'solid 2px rgb(50, 166, 169)' };
        } else {
            return { 'border': 'solid 2px #8eb8ef' };
        }
    }

    getTabHoverStyle() {
        if (this.currStyle == 2) {
            return { 'background': 'rgb(63, 200, 202)', 'border': 'solid 1px rgb(40, 150, 152)', 'color': 'white' };
        } else {
            return { 'background': 'rgba(103, 155, 222, 0.88)', 'border': 'solid 1px #4a73a9', 'color': 'white' };
        }
    }

    /*
    * set tab Background style
    */
    getTabNavStyle() {
        return { 'background': 'transparent' };
    }
    // tab  css end

    getButtonStyle() {
        if (this.currStyle == 2) {
            return { 'background': 'rgb(50, 166, 169)', 'border': 'solid 1px rgb(50, 166, 169)' };
        } else {
            return { 'background': '#5992dc', 'border': 'solid 1px #709fdc' };
        }
    }

    getButtonHoverStyle() {
        if (this.currStyle == 2) {
            return { 'background': 'rgb(40, 150, 152)', 'border': 'solid 1px rgb(40, 150, 152)' };
        } else {
            return { 'background': '#4a73a9', 'border': 'solid 1px #4a73a9' };
        }
    }
}