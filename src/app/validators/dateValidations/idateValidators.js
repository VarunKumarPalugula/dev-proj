System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DateValidators;
    return {
        setters: [],
        execute: function () {
            DateValidators = (function () {
                function DateValidators() {
                }
                DateValidators.setErrors = function (value) {
                    this.err = value;
                };
                DateValidators.getErrors = function () {
                    return this.err;
                };
                /* function to set default date format*/
                DateValidators.dateFormat = function (myDate) {
                    var strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var dd = myDate.date;
                    var mm = myDate.months;
                    var y = myDate.years;
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    //console.log("------ssss--------s--->"+mm);
                    var formattedDate = dd + "-" + strMonth[mm] + "-" + y;
                    //console.log("--------------s--->"+strMonth[mm]);
                    this.setErrors("");
                    return formattedDate;
                };
                /**
                     * @parm day is Date (1-31)
                     * @param month is month (1-12)
                     * @param year is the year(1900 - 9999)
                     * @returns true if input date is a Valid Date otherwise returns false.
                     */
                DateValidators.isValidDate = function (day, month, year) {
                    var isValid = true;
                    if ((year < 1900) || (year > 9999))
                        isValid = false;
                    else if ((month < 1) || (month > 12))
                        isValid = false;
                    else if ((day < 1) || (day > this.getDaysInMonth(month, year)))
                        isValid = false;
                    return isValid;
                };
                /**
                     *  If date is true it return the date
                     * if date is false return date and the erroeMessage
                     */
                DateValidators.isErrorInDate = function (pDate) {
                    this.setErrors("");
                    var strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var strCaseMonth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                    var strUpperCaseMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    var currDate = pDate;
                    var day;
                    var month;
                    var year;
                    console.log(" isErrorInDate ", pDate);
                    if (pDate.lastIndexOf('-') == -1 && pDate.lastIndexOf('/') == -1 && pDate.length < 10) {
                        var date = pDate.match(/.{1}/g);
                        day = date[0] + date[1];
                        if (pDate.length < 7 || pDate.length == 8) {
                            month = strUpperCaseMonth[(parseInt(date[2] + date[3]) - 1)];
                            if (date[6] === undefined && date[7] === undefined) {
                                year = date[4] + date[5];
                            }
                            else {
                                year = date[4] + date[5] + date[6] + date[7];
                            }
                        }
                        else {
                            month = date[2] + date[3] + date[4];
                            if (date[7] === undefined && date[8] === undefined)
                                year = date[5] + date[6];
                            else
                                year = date[5] + date[6] + date[7] + date[8];
                        }
                        pDate = day + "-" + month + "-" + year;
                    }
                    console.log(" isErrorInDate !@@##  ", pDate);
                    var len = pDate.length;
                    if (pDate.lastIndexOf('-') > 0) {
                        day = (pDate.substring(0, pDate.indexOf('-')));
                        month = pDate.substring(pDate.indexOf('-') + 1, pDate.lastIndexOf('-'));
                        year = (pDate.substring(pDate.lastIndexOf('-') + 1, len));
                    }
                    else if (pDate.lastIndexOf('/') > 0) {
                        day = (pDate.substring(0, pDate.indexOf('/')));
                        month = pDate.substring(pDate.indexOf('/') + 1, pDate.lastIndexOf('/'));
                        year = (pDate.substring(pDate.lastIndexOf('/') + 1, len));
                    }
                    if (year && year.length == 2) {
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
                    var monthNum;
                    var numMonth;
                    for (var i = 0; i <= 11; i++) {
                        if ((month == strMonth[i]) || (month == strCaseMonth[i]) || (month == strUpperCaseMonth[i])) {
                            monthNum = i + 1;
                            numMonth = i;
                        }
                        else if (month == i) {
                            monthNum = month;
                            numMonth = month - 1;
                        }
                    }
                    if (monthNum === undefined) {
                        this.setErrors("Month is incorrect");
                        return currDate;
                    }
                    if (!this.isValidDate(day, monthNum, year)) {
                        this.setErrors("Date is incorrect");
                        return pDate;
                    }
                    else {
                        var formattedDate = day + "-" + strUpperCaseMonth[numMonth] + "-" + year;
                        this.setErrors("");
                        return formattedDate;
                    }
                };
                /**
                    * @param month is Index for month ( 1- 12)
                    * @param year is the year
                    * @returns number of days in the input month.
                    */
                DateValidators.getDaysInMonth = function (month, year) {
                    if ((month == 1) || (month == 3) || (month == 5) || (month == 7) ||
                        (month == 8) || (month == 10) || (month == 12))
                        return 31;
                    else if ((month == 4) || (month == 6) || (month == 9) || (month == 11))
                        return 30;
                    else if ((month == 2) && !this.isLeapYear(year))
                        return 28;
                    else if ((month == 2) && this.isLeapYear(year))
                        return 29;
                    return 30;
                };
                /**
                     * @param year is ith input year
                     * @returns true if input year is leapyear otherwise returns false.
                     */
                DateValidators.isLeapYear = function (year) {
                    var remainder = 0;
                    remainder = year % 4;
                    if ((year % 100) == 0)
                        remainder = year % 400;
                    if (remainder == 0)
                        return true;
                    else
                        return false;
                };
                /**
                    * To get the formatted date from the shortcuts,
                    *  shortcuts  are *m,*y,*d('*' represents any numeric value,m=month,y=year,d=day)
                    */
                DateValidators.dateValidation = function (value, addDate) {
                    console.log(" entered into datevalidation", value, "##########", addDate);
                    var myDate;
                    var dateVal = value;
                    if (addDate && (addDate != "")) {
                        myDate = moment(addDate, '' || 'DD-MMM-YYYY ').toObject();
                    }
                    else {
                        myDate = moment().toObject();
                    }
                    //myDate.toLocaleString();
                    var x = dateVal.substring(0, dateVal.length - 1);
                    var y = dateVal.substring(1, dateVal.length - 1);
                    console.log(" dateValidation  ", x, "     y    ", y);
                    var count = 0, validChars = "yYmMdDwWsSoOtT";
                    var inputStr = dateVal;
                    var len = inputStr.length;
                    var c = ' ', c2, offset = 0;
                    var c1 = inputStr.substring(0, inputStr.length - 1);
                    if (len > 4) {
                        console.log("inputStr dateValidation", inputStr);
                        return inputStr;
                    }
                    console.log("inputStr dateValidation", inputStr);
                    if ("OoSsTt".indexOf(c1) > -1) {
                        c = c1;
                    }
                    else {
                        c2 = inputStr.charAt(len - 1);
                        if (validChars.indexOf(c1) != -1) {
                            offset = parseInt(inputStr.substring(1));
                            c = c1;
                        }
                        else if (validChars.indexOf(c2) != -1) {
                            offset = parseInt(inputStr.substring(0, len - 1));
                            c = c2;
                        }
                    }
                    console.log("dateValidation...................c     ", c, "        dateVal       ", dateVal);
                    if (c == 'y' || c == 'Y') {
                        if (dateVal.charAt(0) == '-') {
                            myDate.years = myDate.years - parseInt(y);
                            if (moment(myDate).day() == 0) {
                                //myDate.date = myDate.date + 1;
                                var iDate = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                            }
                            if (moment(myDate).day() == 6) {
                                //myDate.date = myDate.date + 2;
                                var iDate = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                            }
                            console.log("back date   year     ", myDate);
                            return this.dateFormat(myDate);
                        }
                        else {
                            myDate.years = myDate.years + parseInt(x);
                            if (moment(myDate).day() == 0) {
                                //myDate.date = myDate.date + 1;
                                var iDate = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                            }
                            if (moment(myDate).day() == 6) {
                                var iDate = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                                //myDate.date = myDate.date + 2;
                            }
                            return this.dateFormat(myDate);
                        }
                    }
                    else if (c == 'd' || c == 'D') {
                        if (dateVal.charAt(0) == '-') {
                            var iDate = moment(myDate).date(myDate.date - parseInt(y));
                            myDate.months = iDate.month();
                            myDate.years = iDate.year();
                            myDate.date = iDate.date();
                            // myDate.date = myDate.date - parseInt(y);
                            if (moment(myDate).day() != 0 && moment(myDate).day() != 6)
                                count++;
                            if (moment(myDate).day() == 0) {
                                var iDate_1 = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate_1.month();
                                myDate.years = iDate_1.year();
                                myDate.date = iDate_1.date();
                                //myDate.date = myDate.date + 1;
                            }
                            if (moment(myDate).day() == 6) {
                                var iDate_2 = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate_2.month();
                                myDate.years = iDate_2.year();
                                myDate.date = iDate_2.date();
                                // myDate.date = myDate.date + 2;
                            }
                            console.log("back date  days    ", myDate);
                            return this.dateFormat(myDate);
                        }
                        else {
                            while (count <= x) {
                                var iDate = moment(myDate).date(myDate.date + parseInt(x));
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                                // myDate.date = myDate.date + parseInt(x);
                                if (moment(myDate).day() != 0 && moment(myDate).day() != 6)
                                    count++;
                                if (moment(myDate).day() == 0) {
                                    var iDate_3 = moment(myDate).date(myDate.date + 1);
                                    myDate.months = iDate_3.month();
                                    myDate.years = iDate_3.year();
                                    myDate.date = iDate_3.date();
                                    //myDate.date = myDate.date + 1;
                                }
                                if (moment(myDate).day() == 6) {
                                    var iDate_4 = moment(myDate).date(myDate.date + 2);
                                    myDate.months = iDate_4.month();
                                    myDate.years = iDate_4.year();
                                    myDate.date = iDate_4.date();
                                    // myDate.date = myDate.date + 2;
                                }
                                return this.dateFormat(myDate);
                            }
                        }
                    }
                    else if (c == 'm' || c == 'M') {
                        if (dateVal.charAt(0) == '-') {
                            var iMonth = moment(myDate).months(myDate.months - parseInt(y));
                            console.log("iMonth***********", iMonth);
                            myDate.date = iMonth.date();
                            myDate.months = iMonth.month();
                            myDate.years = iMonth.year();
                            // myDate.months = myDate.months - parseInt(y);
                            if (moment(myDate).day() == 0) {
                                //myDate.date = myDate.date + 1;
                                var iDate = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                            }
                            if (moment(myDate).day() == 6) {
                                //myDate.date = myDate.date + 2;
                                var iDate = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                            }
                            console.log("back date  month   ", myDate);
                            return this.dateFormat(myDate);
                        }
                        else {
                            //holiday logic
                            var iMonth = moment(myDate).months(myDate.months + parseInt(x));
                            console.log("iMonth***********", iMonth);
                            myDate.date = iMonth.date();
                            myDate.months = iMonth.month();
                            myDate.years = iMonth.year();
                            if (moment(myDate).day() == 0) {
                                var iDate = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                                //myDate.date = myDate.date + 1;
                            }
                            if (moment(myDate).day() == 6) {
                                var iDate = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                                //myDate.date = myDate.date + 2;
                            }
                            return this.dateFormat(myDate);
                        }
                    }
                    else if (c == 'w' || c == 'W') {
                        if (dateVal.charAt(0) == '-') {
                            var iDate = moment(myDate).date(myDate.date - (parseInt(y) * 7));
                            myDate.months = iDate.month();
                            myDate.years = iDate.year();
                            myDate.date = iDate.date();
                            // myDate.date = myDate.date - (parseInt(y) * 7);
                            if (moment(myDate).day() != 0 && moment(myDate).day() != 6)
                                count++;
                            if (moment(myDate).day() == 0) {
                                //myDate.date = myDate.date + 1;
                                var iDate_5 = moment(myDate).date(myDate.date + 1);
                                myDate.months = iDate_5.month();
                                myDate.years = iDate_5.year();
                                myDate.date = iDate_5.date();
                            }
                            if (moment(myDate).day() == 6) {
                                //myDate.date = myDate.date + 2;
                                var iDate_6 = moment(myDate).date(myDate.date + 2);
                                myDate.months = iDate_6.month();
                                myDate.years = iDate_6.year();
                                myDate.date = iDate_6.date();
                            }
                            console.log("back date   week    ", myDate);
                            return this.dateFormat(myDate);
                        }
                        else {
                            while (count < x) {
                                var iDate = moment(myDate).date(myDate.date + (parseInt(x) * 7));
                                myDate.months = iDate.month();
                                myDate.years = iDate.year();
                                myDate.date = iDate.date();
                                // myDate.date = myDate.date + (parseInt(x) * 7);
                                if (moment(myDate).day() != 0 && moment(myDate).day() != 6)
                                    count++;
                                if (moment(myDate).day() == 0) {
                                    //myDate.date = myDate.date + 1;
                                    var iDate_7 = moment(myDate).date(myDate.date + 1);
                                    myDate.months = iDate_7.month();
                                    myDate.years = iDate_7.year();
                                    myDate.date = iDate_7.date();
                                }
                                if (moment(myDate).day() == 6) {
                                    //myDate.date = myDate.date + 2;
                                    var iDate_8 = moment(myDate).date(myDate.date + 2);
                                    myDate.months = iDate_8.month();
                                    myDate.years = iDate_8.year();
                                    myDate.date = iDate_8.date();
                                }
                                console.log("week validation   ", myDate);
                                return this.dateFormat(myDate);
                            }
                        }
                    }
                    else if (c == 's' || c == 'S') {
                        myDate.date = myDate.date + 2;
                        if (moment(myDate).day() == 0)
                            myDate.date = myDate.date + 2;
                        if (moment(myDate).day() == 6)
                            myDate.date = myDate.date + 3;
                        return this.dateFormat(myDate);
                    }
                    else if (c == 't' || c == 'T') {
                        myDate.date = myDate.date + 1;
                        if (moment(myDate).day() == 0)
                            myDate.date = myDate.date + 1;
                        if (moment(myDate).day() == 6)
                            myDate.date = myDate.date + 2;
                        return this.dateFormat(myDate);
                    }
                }; //end of date validations
                /**
                   * This method is used to check maturity date greater than value date
                   *
                   */
                DateValidators.toDate = function (dateStr) {
                    var months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
                    var p = dateStr.split('-');
                    return new Date(p[2], months[p[1].toLowerCase()], p[0]);
                };
                DateValidators.compareDate = function (d1, d2, placeholder1, placeholder2) {
                    var date2 = moment(d2, ["DD-MMM-YYYY", "YYYY-MM-DD"]).format("DD-MMM-YYYY");
                    var date1 = moment(d1, ["DD-MMM-YYYY", "YYYY-MM-DD"]).format("DD-MMM-YYYY");
                    if (date2 && (date2 != null)) {
                        if (moment(date1, ["DD-MMM-YYYY", "YYYY-MM-DD"]).isAfter(moment(date2, ["DD-MMM-YYYY", "YYYY-MM-DD"]))) {
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
                };
                /**
                 * @param maturityCallFlag, maturity date,value date
                 * To add days to the date
                 */
                DateValidators.addDays = function (days, date) {
                    if ((date != "") || (date)) {
                        var someDate = new Date(date);
                        var numberOfDaysToAdd = days;
                        var validDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                        return this.dateFormat(someDate);
                    }
                    /*else {return "";}*/
                };
                /**
                 * To find difference between the da
                 */
                DateValidators.daysBetween = function (date1, date2) {
                    var d1 = moment(date1);
                    var d2 = moment(date2);
                    return moment.duration(d2.diff(d1)).asDays();
                };
                /**
                 * To set error messages
                 */
                DateValidators.err = '';
                return DateValidators;
            }());
            exports_1("DateValidators", DateValidators);
        }
    };
});
//# sourceMappingURL=idateValidators.js.map