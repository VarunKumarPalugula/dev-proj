declare let moment:any;

export class DateValidators {

    /**
     * To set error messages
     */
    static err: string = '';

    static setErrors( value: any ) {
        this.err = value;
    }
    static getErrors() {
        return this.err;
    }

    /* function to set default date format*/
    static dateFormat( myDate ) {
        let strMonth: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dd = myDate.date;
        let mm = myDate.months;
        let y = myDate.years;

        if ( dd < 10 ) {
            dd = '0' + dd;
        }
        //console.log("------ssss--------s--->"+mm);
        let formattedDate = dd + "-" + strMonth[mm] + "-" + y;
        //console.log("--------------s--->"+strMonth[mm]);
        this.setErrors( "" );
        return formattedDate;
    }

    /**
         * @parm day is Date (1-31)
         * @param month is month (1-12)
         * @param year is the year(1900 - 9999)
         * @returns true if input date is a Valid Date otherwise returns false.
         */
    static isValidDate( day, month, year ) {
        let isValid: boolean = true;
        if ( ( year < 1900 ) || ( year > 9999 ) )
            isValid = false;
        else if ( ( month < 1 ) || ( month > 12 ) )
            isValid = false;
        else if ( ( day < 1 ) || ( day > this.getDaysInMonth( month, year ) ) )
            isValid = false;
        return isValid;
    }

    /**
         *  If date is true it return the date
         * if date is false return date and the erroeMessage
         */
    static isErrorInDate( pDate ) {
        this.setErrors( "" );
        let strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let strCaseMonth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        let strUpperCaseMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let currDate = pDate;
        let day;
        let month;
        let year;

        console.log( " isErrorInDate ", pDate );
        if ( pDate.lastIndexOf( '-' ) == -1 && pDate.lastIndexOf( '/' ) == -1 && pDate.length < 10 ) {
            let date = pDate.match( /.{1}/g );
            day = date[0] + date[1];
            if ( pDate.length < 7 || pDate.length == 8 ) {
                month = strUpperCaseMonth[( parseInt( date[2] + date[3] ) - 1 )];
                if ( date[6] === undefined && date[7] === undefined ) {
                    year = date[4] + date[5];
                }
                else {
                    year = date[4] + date[5] + date[6] + date[7];
                }
            }
            else {
                month = date[2] + date[3] + date[4];
                if ( date[7] === undefined && date[8] === undefined )
                    year = date[5] + date[6];
                else
                    year = date[5] + date[6] + date[7] + date[8];
            }
            pDate = day + "-" + month + "-" + year;
        }
        console.log( " isErrorInDate !@@##  ", pDate );
        let len = pDate.length;
        if ( pDate.lastIndexOf( '-' ) > 0 ) {
            day = ( pDate.substring( 0, pDate.indexOf( '-' ) ) );
            month = pDate.substring( pDate.indexOf( '-' ) + 1, pDate.lastIndexOf( '-' ) );
            year = ( pDate.substring( pDate.lastIndexOf( '-' ) + 1, len ) );
        } else if ( pDate.lastIndexOf( '/' ) > 0 ) {
            day = ( pDate.substring( 0, pDate.indexOf( '/' ) ) );
            month = pDate.substring( pDate.indexOf( '/' ) + 1, pDate.lastIndexOf( '/' ) );
            year = ( pDate.substring( pDate.lastIndexOf( '/' ) + 1, len ) );
        }
        if ( year && year.length == 2 ) {
            year = "20" + year;
        }

        /*  if (!isNaN(month)) {
              if (month > 0 && month < 13) {
                  let month = strMonth[month];
              }
              else {
                  this.setErrors("Month is incorrect");
                  return currDate;
              }
          }*/
        let monthNum;
        let numMonth;
        for ( let i = 0; i <= 11; i++ ) {

            if ( ( month == strMonth[i] ) || ( month == strCaseMonth[i] ) || ( month == strUpperCaseMonth[i] ) ) {
                monthNum = i + 1;
                numMonth = i;
            }
            else if ( month == i ) {
                monthNum = month;
                numMonth = month - 1;
            }
        }
        if ( monthNum === undefined ) {
            this.setErrors( "Month is incorrect" );
            return currDate;
        }

        if ( !this.isValidDate( day, monthNum, year ) ) {
            this.setErrors( "Date is incorrect" );
            return pDate;
        } else {
            let formattedDate = day + "-" + strUpperCaseMonth[numMonth] + "-" + year;
            this.setErrors( "" );
            return formattedDate;

        }
    }

    /**
        * @param month is Index for month ( 1- 12)
        * @param year is the year
        * @returns number of days in the input month.
        */
    static getDaysInMonth( month, year ) {
        if ( ( month == 1 ) || ( month == 3 ) || ( month == 5 ) || ( month == 7 ) ||
            ( month == 8 ) || ( month == 10 ) || ( month == 12 ) )
            return 31;
        else if ( ( month == 4 ) || ( month == 6 ) || ( month == 9 ) || ( month == 11 ) )
            return 30;
        else if ( ( month == 2 ) && !this.isLeapYear( year ) )
            return 28;
        else if ( ( month == 2 ) && this.isLeapYear( year ) )
            return 29;
        return 30;
    }

    /**
         * @param year is ith input year
         * @returns true if input year is leapyear otherwise returns false.
         */
    static isLeapYear( year ) {
        let remainder: number = 0;
        remainder = year % 4;
        if ( ( year % 100 ) == 0 )
            remainder = year % 400;
        if ( remainder == 0 )
            return true;
        else
            return false;
    }


    /**
        * To get the formatted date from the shortcuts, 
        *  shortcuts  are *m,*y,*d('*' represents any numeric value,m=month,y=year,d=day) 
        */
    static dateValidation( value: any, addDate: any ) {
        console.log( " entered into datevalidation", value, "##########", addDate );
        let myDate: any;
        let dateVal = value;
        if ( addDate && ( addDate != "" ) ) {
            myDate = moment( addDate, '' || 'DD-MMM-YYYY ' ).toObject();
        } else {
            myDate = moment().toObject();
        }
        //myDate.toLocaleString();
        let x = dateVal.substring( 0, dateVal.length - 1 );
        let y = dateVal.substring( 1, dateVal.length - 1 );

        console.log( " dateValidation  ", x, "     y    ", y );
        let count = 0, validChars = "yYmMdDwWsSoOtT";
        let inputStr = dateVal;
        let len = inputStr.length;
        let c = ' ', c2, offset = 0;
        let c1 = inputStr.substring(0, inputStr.length - 1);
        if ( len > 4 ) {
            console.log( "inputStr dateValidation", inputStr );
            return inputStr;
        }
        console.log( "inputStr dateValidation", inputStr );
        if ( "OoSsTt".indexOf( c1 ) > -1 ) {
            c = c1;
        } else {
            c2 = inputStr.charAt( len - 1 );
            if ( validChars.indexOf( c1 ) != -1 ) {
                offset = parseInt( inputStr.substring( 1 ) );
                c = c1;

            } else if ( validChars.indexOf( c2 ) != -1 ) {
                offset = parseInt( inputStr.substring( 0, len - 1 ) );
                c = c2;
            }
        }

        console.log( "dateValidation...................c     ", c, "        dateVal       ", dateVal );
        if ( c == 'y' || c == 'Y' ) {

            if ( dateVal.charAt( 0 ) == '-' ) {
                myDate.years = myDate.years - parseInt( y );
                if ( moment( myDate ).day() == 0 ) {
                    //myDate.date = myDate.date + 1;
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                if ( moment( myDate ).day() == 6 ) {
                    //myDate.date = myDate.date + 2;
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                console.log( "back date   year     ", myDate );

                return this.dateFormat( myDate );
            }
            else {
                myDate.years = myDate.years + parseInt( x );
                if ( moment( myDate ).day() == 0 ) {
                    //myDate.date = myDate.date + 1;
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                if ( moment( myDate ).day() == 6 ) {
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                    //myDate.date = myDate.date + 2;
                }
                return this.dateFormat( myDate );
            }
        }

        else if ( c == 'd' || c == 'D' ) { /* forwarding one day*/
            if ( dateVal.charAt( 0 ) == '-' ) {
                let iDate = moment( myDate ).date( myDate.date - parseInt( y ) );
                myDate.months = iDate.month();
                myDate.years = iDate.year();
                myDate.date = iDate.date();
                // myDate.date = myDate.date - parseInt(y);
                if ( moment( myDate ).day() != 0 && moment( myDate ).day() != 6 )
                    count++;
                if ( moment( myDate ).day() == 0 ) {
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                    //myDate.date = myDate.date + 1;
                }

                if ( moment( myDate ).day() == 6 ) {
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                    // myDate.date = myDate.date + 2;
                }

                console.log( "back date  days    ", myDate );
                return this.dateFormat( myDate );
            }
            else {
                while ( count <= x ) { //holiday logic
                    let iDate = moment( myDate ).date( myDate.date + parseInt( x ) );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                    // myDate.date = myDate.date + parseInt(x);
                    if ( moment( myDate ).day() != 0 && moment( myDate ).day() != 6 )
                        count++;
                    if ( moment( myDate ).day() == 0 ) {
                        let iDate = moment( myDate ).date( myDate.date + 1 );
                        myDate.months = iDate.month();
                        myDate.years = iDate.year();
                        myDate.date = iDate.date();
                        //myDate.date = myDate.date + 1;
                    }

                    if ( moment( myDate ).day() == 6 ) {
                        let iDate = moment( myDate ).date( myDate.date + 2 );
                        myDate.months = iDate.month();
                        myDate.years = iDate.year();
                        myDate.date = iDate.date();
                        // myDate.date = myDate.date + 2;
                    }

                    return this.dateFormat( myDate );
                }
            }
        }

        else if ( c == 'm' || c == 'M' ) { /* to add months */

            if ( dateVal.charAt( 0 ) == '-' ) {
                let iMonth = moment( myDate ).months( myDate.months - parseInt( y ) );
                console.log( "iMonth***********", iMonth );
                myDate.date = iMonth.date();
                myDate.months = iMonth.month();
                myDate.years = iMonth.year();
                // myDate.months = myDate.months - parseInt(y);
                if ( moment( myDate ).day() == 0 ) {
                    //myDate.date = myDate.date + 1;
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                if ( moment( myDate ).day() == 6 ) {
                    //myDate.date = myDate.date + 2;
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                console.log( "back date  month   ", myDate );
                return this.dateFormat( myDate );
            }
            else {
                //holiday logic
                let iMonth = moment( myDate ).months( myDate.months + parseInt( x ) );
                console.log( "iMonth***********", iMonth );
                myDate.date = iMonth.date();
                myDate.months = iMonth.month();
                myDate.years = iMonth.year();
                if ( moment( myDate ).day() == 0 ) {
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();

                    //myDate.date = myDate.date + 1;


                }
                if ( moment( myDate ).day() == 6 ) {
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();

                    //myDate.date = myDate.date + 2;
                }
                return this.dateFormat( myDate );

            }
        }

        else if ( c == 'w' || c == 'W' ) { /* to add a week days*/

            if ( dateVal.charAt( 0 ) == '-' ) {
                let iDate = moment( myDate ).date( myDate.date - ( parseInt( y ) * 7 ) );
                myDate.months = iDate.month();
                myDate.years = iDate.year();
                myDate.date = iDate.date();
                // myDate.date = myDate.date - (parseInt(y) * 7);

                if ( moment( myDate ).day() != 0 && moment( myDate ).day() != 6 )
                    count++;
                if ( moment( myDate ).day() == 0 ) {
                    //myDate.date = myDate.date + 1;
                    let iDate = moment( myDate ).date( myDate.date + 1 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                if ( moment( myDate ).day() == 6 ) {
                    //myDate.date = myDate.date + 2;
                    let iDate = moment( myDate ).date( myDate.date + 2 );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                }
                console.log( "back date   week    ", myDate );
                return this.dateFormat( myDate );
            }
            else {
                while ( count < x ) { //holiday logic
                    let iDate = moment( myDate ).date( myDate.date + ( parseInt( x ) * 7 ) );
                    myDate.months = iDate.month();
                    myDate.years = iDate.year();
                    myDate.date = iDate.date();
                    // myDate.date = myDate.date + (parseInt(x) * 7);

                    if ( moment( myDate ).day() != 0 && moment( myDate ).day() != 6 )
                        count++;
                    if ( moment( myDate ).day() == 0 ) {
                        //myDate.date = myDate.date + 1;
                        let iDate = moment( myDate ).date( myDate.date + 1 );
                        myDate.months = iDate.month();
                        myDate.years = iDate.year();
                        myDate.date = iDate.date();
                    }
                    if ( moment( myDate ).day() == 6 ) {
                        //myDate.date = myDate.date + 2;
                        let iDate = moment( myDate ).date( myDate.date + 2 );
                        myDate.months = iDate.month();
                        myDate.years = iDate.year();
                        myDate.date = iDate.date();
                    }
                    console.log( "week validation   ", myDate );
                    return this.dateFormat( myDate );
                }
            }
        }
        else if ( c == 's' || c == 'S' ) { /* calculating spot(t+2)*/

            myDate.date = myDate.date + 2;
            if ( moment( myDate ).day() == 0 )
                myDate.date = myDate.date + 2;
            if ( moment( myDate ).day() == 6 )
                myDate.date = myDate.date + 3;
            return this.dateFormat( myDate );
        }
        else if ( c == 't' || c == 'T' ) {
            myDate.date = myDate.date + 1;
            if ( moment( myDate ).day() == 0 )
                myDate.date = myDate.date + 1;
            if ( moment( myDate ).day() == 6 )
                myDate.date = myDate.date + 2;
            return this.dateFormat( myDate );
        }

    }//end of date validations


    /**
       * This method is used to check maturity date greater than value date
       * 
       */

    static toDate(dateStr){
        var months = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
        var p = dateStr.split('-');
        return new Date(p[2], months[p[1].toLowerCase()], p[0]);
        }
    
   
    static compareDate( d1, d2, placeholder1, placeholder2 ) {
        let date2 =moment(d2,["DD-MMM-YYYY","YYYY-MM-DD"]).format("DD-MMM-YYYY") ;
        let date1 = moment(d1,["DD-MMM-YYYY","YYYY-MM-DD"]).format("DD-MMM-YYYY");
        if (date2 && (date2 != null)) {
            if (moment(date1,["DD-MMM-YYYY","YYYY-MM-DD"]).isAfter(moment(date2,["DD-MMM-YYYY","YYYY-MM-DD"]))) {
                this.setErrors(placeholder1 + " should be less than  " + placeholder2 + ": " + date2);
                return true;
            }
            else if ((!date2 || date2 == "") && (date1 != "")) {
                this.setErrors(placeholder2 + " Not Entered .");
                return true;
            }
            else {
                this.setErrors("");
                return false;
            }
        }
    }
    /**
     * @param maturityCallFlag, maturity date,value date
     * To add days to the date
     */
    static addDays( days: number, date ) {
        if ( ( date != "" ) || ( date ) ) {
            let someDate = new Date( date );
            let numberOfDaysToAdd = days;
            let validDate = someDate.setDate( someDate.getDate() + numberOfDaysToAdd );
            return this.dateFormat( someDate );
        }
        /*else {return "";}*/

    }
    /**
     * To find difference between the da
     */
    static daysBetween( date1, date2 ) {
        let d1 = moment( date1 );
        let d2 = moment( date2 );
        return moment.duration( d2.diff( d1 ) ).asDays();
    }


    /*static valMatDtChk(valueDate, maturityDate) {
        let mDate = maturityDate;
        let vDate = valueDate;
        this.matValDtChk(vDate, mDate);
    }*/
}