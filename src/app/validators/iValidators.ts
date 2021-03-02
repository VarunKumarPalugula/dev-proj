import {Input} from '@angular/core';

declare var moment: any;
moment.locale('en-US');

export class Validators {
    private static err: string = '';

    static setErrors( value: any ) {
        Validators.err = value;
    }

    static getErrors() {
        return Validators.err;
    }
    
  //Added for SP
    static formatDate(value: any) {
        if (value == null || value == "") {
            return value;
        }
        //console.log("formatDate****",value);
        if(value.lastIndexOf('-') > 5){
                value = this.toDate(value);
        }
        //console.log("formatDate*33***",moment(value).format('YYYY-MM-DD'));
        value = moment(value).format('YYYY-MM-DD');
        console.log("formatDate***99999*",value);
      
        return value.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');

    }
    
    static toDate(dateStr: any) {
        let months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        let p = dateStr.split('-');
        return new Date(p[2], months[p[1].toLowerCase()], p[0]);
    }

    //Added for SP
    static removeLocaleFormatting(value: any) {
        if (value == null || value == "") { return value; }
        var languageStr = "";
        value = "" + value;
        /*if (navigator.browserLanguage != undefined) {
            languageStr = navigator.browserLanguage;
            //alert("navigator.browserLanguage:"+languageStr);
        }
        else if (navigator.languages != undefined) {
            languageStr = navigator.languages[0];
            //alert("navigator.languages[0]:"+languageStr);
        } else {
            languageStr = navigator.language;
            //alert("navigator.language:"+languageStr);
        }*/
		
		if ( navigator.language != undefined ) {
            languageStr = navigator.language;
        }
		else {
            languageStr = navigator.language;
        }

        if (languageStr.indexOf("tr") != -1) { //Turkish
            value = value.replace(/./g, '');
            value = value.replace(/,/g, '.');
        }
        else {
            value = value.replace(/,/g, '');
        }
        return value;
        
    }
    
    /**
     * This method is used for to get amount from shortcuts
     * shortcuts are *K.*L,*M,*B,*T. ('*' reopresents numeric value. )
     * If enter value is correct return value
     * if value is not correct give errorMessage and return the value 
     */
    static amountValidation( value: any ) {
        if ( value === '' || value === ' ' || value == null ) {
        } else {
            var amount = value.toString().toUpperCase();
            var length = amount.length;
            var errorFound = false;
            var alphaNumCounter = 0;
            let dotCounter = 0;
            let commaCounter = 0;
            var charCounter = 0;
            var start = 0;
            this.setErrors( "" );

            if ( amount.charAt( 0 ) == "-" ) {
                start = 1;
            }
            if ( ( ( amount.charAt( 0 ) >= '0' && amount.charAt( 0 ) <= '9' ) || amount.charAt( 0 ) == '.' ) && length > 0 && length <= 17 ) {
                for ( var i = start; i < length; i++ ) {
                    if ( amount.charAt( i ) >= '0' && amount.charAt( i ) <= '9' ) {
                        ++alphaNumCounter;
                    }
                    else if ( amount.charAt( i ) >= 'A' && amount.charAt( i ) <= 'Z' ) {
                        ++charCounter;
                    }
                    else if ( amount.charAt( i ) == '.' ) {
                        ++dotCounter;
                    } else if ( amount.charAt( i ) == ',' ) {
                        ++commaCounter;
                    } else {
                        this.setErrors( "Numeric value required" );
                        return value;

                    }
                }
                if ( commaCounter > 0 ) {
                    amount = parseInt(( amount ).replace( /,/g, '' ) );
                }
                if ( ( charCounter > 1 && length <= 17 ) || ( dotCounter > 1 ) ) {
                    this.setErrors( "Invalid short code" );
                    return value;
                }
                if ( charCounter > 0 && length <= 17 ) {
                    var charRepresentation = amount.charAt( length - 1 );
                    if ( ( charRepresentation >= 'A' && charRepresentation <= 'Z' ) || ( dotCounter > 1 ) ) {
                        var inputValue = amount.substring( start, length - 1 );
                        switch ( charRepresentation ) {
                            case 'T':
                                amount = inputValue * 1000;
                                break;
                            case 'L':
                                amount = inputValue * 100000;
                                break;
                            case 'M':
                                amount = inputValue * 1000000;
                                break;
                            case 'B':
                                amount = inputValue * 1000000000;
                                break;
                            default:
                                this.setErrors( "Invalid short code" );
                                return value;

                        }
                    } else if ( dotCounter == 1 ) {
                        let parts = amount.split( "." );
                        amount = parts[0];
                    }
                    this.setErrors( "" );
                    amount = amount * 1;
                    if ( start == 1 ) {
                        amount = -amount;
                    }
                    return amount.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 } );
                } else {
                    this.setErrors( "" );
                    amount = amount * 1;
                    return amount.toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 } );
                }

            } else {
                this.setErrors( "Entered value format is incorrect " );
                return value;
            }
        }
    }
    //Amount Validation done

    /**
     * 
     */
    static rateValidation( value: any ) {
        this.setErrors( "" );
        if (value === '' || value === ' ' || value == null) {
        }
        else {
        var tRate = value.toString();
        var numbers = /^[0-9]+$/;

        var fieldLength = tRate.length, splChars = 0, i, errorFound = false;
        if ( fieldLength && tRate.charAt( fieldLength - 1 ) == '%' ) { // If suffix is % remove it
            tRate = tRate.substring( 0, fieldLength - 1 );
            fieldLength = tRate.length;
        }
        for ( i = 0; i < fieldLength; i++ ) { // If still the length is nonZero check if it is number
            if ( !( ( tRate.charAt( i ) >= '0' && tRate.charAt( i ) <= '9' ) || ( tRate.charAt( i ) == '.' ) || ( tRate.charAt( i ) == '-' ) ) ) {
                errorFound = true;
                //break;
            }

            if ( tRate.charAt( i ) == '-' && i != 0 )
                errorFound = true;
            if ( tRate.charAt( i ) == '.' )
                ++splChars;

        }

        if ( splChars > 1 )
            errorFound = true;

        if ( !errorFound ) { // check if the first no. is a '.'
            if ( fieldLength > 0 ) {
                if ( fieldLength == 1 && tRate.charAt( 0 ) == '.' ) {
                    errorFound = true;
                }
            }
            if ( splChars == 0 && fieldLength > 7 ) {
                errorFound = true;
            }
            else if ( splChars == 1 ) {
                var dotIndex = tRate.indexOf( '.', 0 );
                var integralPart = tRate.substring( 0, dotIndex );
                var lengthBeforeDot = integralPart.length;
                //   if (lengthBeforeDot > 7)
                if ( lengthBeforeDot > 7 )
                    errorFound = true;

            }

        }
        if ( errorFound ) {
            this.setErrors( "Invalid Rate" );
            return value;
        }
        // value = "Error";
        else if ( !errorFound && tRate != "" ) {
            tRate = tRate * 1;
        }
        this.setErrors( "" );
        if ( tRate != "" ) {
            return tRate.toFixed( 6 );
        } else {
            return "";
            }
        }
    }// end of rate    

    static indexCommaRemove( value ) {
        console.log( "value isNaN(value)     ", isNaN( value ) );
        if ( value && isNaN( value ) && value.indexOf( "," ) > -1 ) {
            let reqValue = parseInt( value.replace( /,/g, '' ) );
            value = reqValue;
        }
        console.log( " indexremove value  ", value );
        return value;

    }
}