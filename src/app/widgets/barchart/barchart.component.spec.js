System.register(["@angular/core/testing", "./barchart.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, barchart_component_1;
    return {
        setters: [
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (barchart_component_1_1) {
                barchart_component_1 = barchart_component_1_1;
            }
        ],
        execute: function () {
            describe('BarchartComponent', function () {
                var component;
                var fixture;
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        declarations: [barchart_component_1.BarchartComponent]
                    })
                        .compileComponents();
                }));
                beforeEach(function () {
                    fixture = testing_1.TestBed.createComponent(barchart_component_1.BarchartComponent);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });
                it('should create', function () {
                    expect(component).toBeTruthy();
                });
            });
        }
    };
});
//# sourceMappingURL=barchart.component.spec.js.map