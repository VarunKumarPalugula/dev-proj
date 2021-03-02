System.register(["@angular/core", "app/base/iField"], function (exports_1, context_1) {
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
    var core_1, iField_1, ToolbarComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            }
        ],
        execute: function () {
            ToolbarComponent = (function (_super) {
                __extends(ToolbarComponent, _super);
                function ToolbarComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.formvalid = false;
                    _this.flag = false;
                    _this.submissionValue = new core_1.EventEmitter();
                    _this.toolbarEvent = new core_1.EventEmitter();
                    return _this;
                }
                ToolbarComponent_1 = ToolbarComponent;
                ToolbarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //Getting Toolbar actions based on request Type
                    //Getting Toolbar actions based on request Type
                    //this.dataService.getListItems(this.requestType).subscribe(function (listItems) {
                    //    _this.actionList = listItems;
                    //});
					this.actionList = this.globalService.getActionList();
                };
                //On click of any actions sending Path to perform operation
                ToolbarComponent.prototype.onClick = function (path, disabled) {
                    this.toolbarPath = path;
                    this.flag = !disabled;
                    this.toolbarEvent.emit();
                    /*if(this.flag){
                        
                    }*/
                };
                //Sending the action path to Component (Example : Deal Capture)
                ToolbarComponent.prototype.onConfirmation = function (value) {
                    this.flag = !this.flag;
                    console.log("onChange  toolbar: ", value);
                    if (value == true) {
                        this.submissionValue.emit(this.toolbarPath);
                    }
                };
                ToolbarComponent = ToolbarComponent_1 = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iToolbar',
                        templateUrl: 'iToolbar.html',
                        styleUrls: ['iToolbar.css'],
                        inputs: ['status', 'toolbarList', 'formvalid'],
                        outputs: ['toolbarEvent', 'submissionValue'],
                        providers: [iField_1.MakeProvider(ToolbarComponent_1)],
                    })
                    //This component is built for ToolBar for Actions
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], ToolbarComponent);
                return ToolbarComponent;
                var ToolbarComponent_1;
            }(iField_1.FieldComponent));
            exports_1("ToolbarComponent", ToolbarComponent);
        }
    };
});
//# sourceMappingURL=iToolbar.js.map