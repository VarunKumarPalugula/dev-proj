// import {Control} from '@angular/common';
import {Input} from '@angular/core'; 

export class BaseValidators {

    static err: any;


    static setErrors(value: any) {

        this.err = value;
        // console.log("**********" + this.err + "***************");
        //return err;
    }

    static getErrors() {
        console.log("%%%%%% getErors  '''", this.err);
        return this.err;
    }

    //Validations for Amount


    static matValDtChk(valueDate, maturityDate) {
        let isOk: boolean = true;;
        console.log(valueDate, "******************   ", new Date(valueDate), "###########   ", new Date(maturityDate), "  ", isOk);

        if (new Date(maturityDate) <= new Date(valueDate)) {
            console.log(" value entered....");

            this.setErrors("maturity date > value date");
            //return isOk;
        }
        else if ((!valueDate || valueDate == "" || (valueDate.charAt(2) != '-' && valueDate.charAt(6) != '-')) && (maturityDate != "")) {
            console.log(" value  undefined not entered....", valueDate);
            this.setErrors(" Value Date Not Entered .");
            //return isOk;
        }
        /*     else if(!maturityDate || maturityDate == "") {
         console.log(" value  undefined not entered....", valueDate);
         this.setErrors(" maturity Date Not Entered .");
             }*/

        else { this.setErrors(""); }
    }

    static valMatDtChk(valueDate, maturityDate) {
        let mDate = maturityDate;
        let vDate = valueDate;
        this.matValDtChk(vDate, mDate);
    }
}
