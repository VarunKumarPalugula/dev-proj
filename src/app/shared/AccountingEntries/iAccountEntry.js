System.register(["@angular/core", "app/base/iField", "app/common/checkbox/iCheckbox"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
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
    var core_1, iField_1, iCheckbox_1, AccountingEntriesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            },
            function (iCheckbox_1_1) {
                iCheckbox_1 = iCheckbox_1_1;
            }
        ],
        execute: function () {
            AccountingEntriesComponent = (function (_super) {
                __extends(AccountingEntriesComponent, _super);
                function AccountingEntriesComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.dataServicePath = "";
                    _this.AccountEntryId = "";
                    _this.formValid = false;
                    _this.modalFlag = false;
                    _this.isAccounting = false;
                    _this.title = "";
                    _this.message = "";
                    return _this;
                }
                AccountingEntriesComponent.prototype.ngOnInit = function () {
                    console.log("In Acc. Entries ngOnInit method");
                    this.dataServicePath = this.contextUrl + "BO/accountentries/";
                    this.viewHistory.value = false;
                    this.getAccountingEntries();
                };
                /**
                 * To get the Accounting Entries  of the Account
                 */
                AccountingEntriesComponent.prototype.getAccountingEntries = function () {
                    var _this = this;
                    console.log("********* getAccountingEntries");
                    this.globalService.progressMode = "indeterminate";
                    var accEntryViewHistory = this.viewHistory.value;
                    console.log("*******this.AccountEntryId: ", this.AccountEntryId, accEntryViewHistory);
                    //this.dataServicePath=this.dataServicePath + "accountentries/";
                    this.dataService.getData(this.AccountEntryId + "/" + accEntryViewHistory, this.dataServicePath).subscribe(function (listItems) {
                        _this.accountList = listItems;
                        _this.globalService.progressMode = "";
                        if (_this.accountList[1] == "") {
                            _this.formValid = true;
                            _this.modalFlag = true;
                            _this.title = "Accounting Entries";
                            _this.message = "Accounting Entries  data not  found";
                        }
                        else {
                            _this.isAccounting = true;
                            _this.modalFlag = true;
                        }
                    });
                };
                //This method is use to generate Accouting Entries Slip
                AccountingEntriesComponent.prototype.generateAccountingEntriesPDF = function () {
                    var refNo = this.AccountEntryId;
                    console.log("Accouting Entries Reference Number***" + refNo);
                    //TO DO : hardcoded userid and branch details and referenceNo changes
                    var requestParams = "selectedOption=GENERATE&selectedURL=/TransactionAdivse&selectedModule=CO&selectedReportGrp=group7&outputFormat=PDF&reportOption=Online&cnumber=" + refNo + "&module=" + this.inputParams.moduleType + "&accflag=true&userId=FOMKR&branchId=1&branchDesc=UBS NewYork&userLocale=en_US";
                    //console.log("*****params***" + requestParams);
                    var fileName = "TransactJrnlAdviseReport_" + this.globalService.getUserName() + ".pdf";
                    this.dataService.downloadPDF("/TreasuryRptServlet", requestParams, fileName);
                };
                AccountingEntriesComponent.prototype.generateArray = function (obj, index) {
                    console.log("generateArray  ", obj, "index", index);
                    if (index > 0) {
                        // return Object.keys(obj).map((key)=>{return obj[key]});
                        return obj;
                    }
                };
                __decorate([
                    core_1.ViewChild('viewHistory'),
                    __metadata("design:type", typeof (_a = typeof iCheckbox_1.CheckboxComponent !== "undefined" && iCheckbox_1.CheckboxComponent) === "function" && _a || Object)
                ], AccountingEntriesComponent.prototype, "viewHistory", void 0);
                AccountingEntriesComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iAccountEntry',
                        templateUrl: 'iAccountEntry.html',
                        styleUrls: ['iAccountEntry.css'],
                        inputs: ['AccountEntryId', 'accountList', 'moduleType']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], AccountingEntriesComponent);
                return AccountingEntriesComponent;
                var _a;
            }(iField_1.FieldComponent));
            exports_1("AccountingEntriesComponent", AccountingEntriesComponent);
        }
    };
});
//# sourceMappingURL=iAccountEntry.js.map