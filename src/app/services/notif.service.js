System.register(["@angular/core","app/services/global.service","app/services/data.service"], function (exports_1, context_1) {
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
    var core_1, NotifService,global_service_1,data_service_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
			 function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            },
			 function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }
        ],
        execute: function () {
            NotifService = (function () {
                function NotifService(globalService,dataService) {
					this.globalService = globalService;
					this.dataService=dataService;
                    this.notifArray = [];
					this.alertMsg=[];
					this.msgEndIndx = 0;
					this.newAlertCnt= 0;
					this.currMsgIndx = 0;
					this.msgStartIndx=0;
					this.applnDate=null;
					this.userId=null;
					this.quotes = [];
					//this.fetchData();
                    console.log("****** NotifService initialized-----------------");
					console.log("***********fetchData called",this.globalService);
					this.init();
					//console.log("***********fetchData called",this.globalService.getApplnDate());
                }
				
				 NotifService.prototype.init = function () {
				 console.log("***********fetchData called");
				
					var _this=this;
					 localStorage.setItem(_this.globalService.getUserName()+"_notifyList","");	
					 localStorage.setItem(_this.globalService.getUserName()+"_categories"," ");
					//_this.applnDate=	_this.globalService.getApplnDate();			 
					setTimeout(function () {
					//new login local storage should be reset
					_this.fetchCategories();
					_this.fetchData();
							
							
                            console.log("********* stop called");
                    }, 5000);
				 };
				 
				   NotifService.prototype.fetchCategories = function () {
				   var _this=this;
				   console.log("fetch catgeories");

				   _this.dataService.getData("", _this.dataService.rootCtx+"services/notification/categories/" + _this.globalService.getUserName()).subscribe(function (listItems) {
					 console.log("fetch catgeories value",listItems);
					 if(listItems){
						if(listItems.length>0){
							localStorage.setItem(_this.globalService.getUserName()+"_categories",listItems);	
						}
						_this.sendNotifRequest(_this.msgEndIndx);
					}
				  });
				   };
				   
				  NotifService.prototype.fetchData = function () {
				   console.log("***********fetchData called");
						var _this=this;
				
				  		var timeoutId = setInterval(function (){   
					//	console.log("***********fetchData called",_this.globalService);
					//	console.log("***********fetchData called",_this.globalService.getApplnDate());
						_this.applnDate = _this.globalService.getApplnDate();
						  console.log("********* 	this.applnDate",_this.applnDate);
						   console.log("********* 	this.applnDate",_this.msgEndIndx);
						   //Change in appDate local storage should be reset
						   if(localStorage.getItem("appDate")){
						  var myDate = moment(_this.applnDate, '' || 'DD-MMM-YYYY ').format('DD-MMM-YYYY');
						   console.log("localStorage appDate2",JSON.parse(localStorage.getItem("appDate")));
						   console.log("localStorage appDate2 compare",JSON.parse(localStorage.getItem("appDate")) !=  "26-Nov-2017");
						   console.log("_this.msgEndIndx bfore date",_this.msgEndIndx);
										if( JSON.parse(localStorage.getItem("appDate")) != myDate){
										 console.log("localStorage appDate2",localStorage.getItem("appDate"));
										// console.log("appDate",_this.applnDate);
										_this.msgEndIndx=0;
										localStorage.setItem(_this.globalService.getUserName()+"_notifyList","");	
										}
										
						   }
						   console.log("***********before calling notif Rqst called",_this.msgEndIndx);
							_this.sendNotifRequest(_this.msgEndIndx);
					/*	_this.dataService.getData("", _this.dataService.rootCtx+"services/data/getAlertMsgs/" + _this.applnDate + "/" + _this.msgEndIndx).subscribe(function (listItems) {
							if(listItems[0].msgList){
								_this.quotes = listItems[0].msgList;
								localStorage.setItem("appDate", JSON.stringify(_this.applnDate));
								if(_this.quotes.length > 0){
								_this.saveToLocalStorage(_this.quotes);
								if(_this.msgEndIndx > 0){
								_this.showAlertMsgs(_this.quotes,_this.currMsgIndx);
									var msgTimer = setInterval(function (){ 
										console.log("***** show notif");
										if (_this.quotes && _this.quotes.length > _this.currMsgIndx){
											_this.notifMessage = _this.quotes[_this.currMsgIndx];
											_this.globalHelpService.setNotification(_this.notifMessage);
											_this.currMsgIndx++;
										} 
									},5000);
									
									}
								}
								
								_this.currMsgIndx = 0;
								_this.msgEndIndx = listItems[0].lstIndx ;
							}
						});*/
					  
					}, 120000);
				  };
				  
				   NotifService.prototype.sendNotifRequest = function (msgEndIdx) {	
				   var _this=this;
				   _this.alertMsg=[];
				   var session = '<%=Session[_this.globalService.getUserName()] != null%>';
				     console.log("***********session",session);
				   if(session){
					var cat=localStorage.getItem(_this.globalService.getUserName()+"_categories");
					if(cat!=null && cat!=""){
					  console.log("***********inside  notif Rqst method Cat",cat);
					  
				   _this.msgEndIndx=msgEndIdx;
				 				
				     console.log("***********inside  notif Rqst method Cat",msgEndIdx);
				   _this.dataService.getData("", _this.dataService.rootCtx+"services/notification/getAlertMsgs/"+cat+"/"+ _this.msgEndIndx).subscribe(function (listItems) {
							  console.log("***********inside  notif Rqst method Cat",msgEndIdx);
							if(listItems[0].msgList){
								_this.quotes = listItems[0].msgList;
								localStorage.setItem("appDate", JSON.stringify(listItems[0].applnDate));
								if(_this.quotes.length > 0){
								_this.saveToLocalStorage(_this.quotes);
								if(_this.msgEndIndx > 0){
								  console.log("***********inside  msg idx",_this.msgEndIndx);
								_this.showAlertMsgs(_this.quotes);
									/*var msgTimer = setInterval(function (){ 
										console.log("***** show notif");
										if (_this.quotes && _this.quotes.length > _this.currMsgIndx){
											_this.notifMessage = _this.quotes[_this.currMsgIndx];
											_this.globalHelpService.setNotification(_this.notifMessage);
											_this.currMsgIndx++;
										} 
									},5000);*/
									
									}
								}
								
								_this.currMsgIndx = 0;
								_this.msgEndIndx = listItems[0].lstIndx ;
							}
						});
							    console.log("***********after  notif Rqst method calling",_this.msgEndIndx);
								}
								}
				   };
				  
				   NotifService.prototype.showAlertMsgs = function (alerts) {	
						var _this = this;
						//_this.newAlertCnt=0;
						var msgIdx=0;
						console.log("***** show notif alerts",_this.newAlertCnt);				   
				   	var msgTimer = setInterval(function (){ 
										if (alerts && alerts.length > msgIdx){
										console.log("***** show notif 1234",alerts[msgIdx]);
										console.log("***** show notif 123455",_this.newAlertCnt);
											_this.alertMsg = JSON.stringify(alerts[msgIdx]);											
											console.log("***** 	this.notifMessage",	_this.alertMsg);
											_this.newAlertCnt++;
											console.log("***** show notif 123455",_this.newAlertCnt);
											msgIdx++;
										} 
									},1000);
				   };
				    NotifService.prototype.saveToLocalStorage = function (notifications) {	
						var _this=this;					
						if (localStorage.getItem(_this.globalService.getUserName()+"_notifyList")) {
								var arr =  JSON.parse(localStorage.getItem(_this.globalService.getUserName()+"_notifyList"));
								this.notifArray = notifications.concat(arr);	
								localStorage.setItem(_this.globalService.getUserName()+"_notifyList",JSON.stringify(this.notifArray));							 
						}
						else{
							 localStorage.setItem(_this.globalService.getUserName()+"_notifyList",JSON.stringify(notifications));
						}												
					};
                NotifService.prototype.setNotification = function (notify) {
                 //   this.notifArray.unshift(notify);
					var _this=this;
					if (localStorage.getItem("notifyList")) {		
                             this.notifArray =  JSON.parse(localStorage.getItem(_this.globalService.getUserName()+"_notifyList"));
						
								this.notifArray.unshift(notify);
								localStorage.setItem(_this.globalService.getUserName()+"_notifyList",JSON.stringify(this.notifArray));							              
						}
						else{														
						 this.notifArray.unshift(notify);						
						 localStorage.setItem(_this.globalService.getUserName()+"_notifyList",JSON.stringify(this.notifArray));
						}
                };
                NotifService.prototype.getNotification = function () {
				var _this=this;
					console.log(" this.notifArray***", localStorage.getItem(_this.globalService.getUserName()+"_notifyList"));
					//console.log(" this.notifArray local***", JSON.parse(localStorage.getItem(_this.globalService.getUserName()+"_notifyList")));
					if(localStorage.getItem(_this.globalService.getUserName()+"_notifyList")=="")
						return  "";
					else
						return JSON.parse(localStorage.getItem(_this.globalService.getUserName()+"_notifyList"));
                };
                NotifService.prototype.delNotif = function (index) {
                    this.notifArray.splice(index, 1);
                };
                NotifService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [typeof (_a = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _a || Object,typeof (_b = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _b || Object])
                ], NotifService);
                return NotifService;
                var _a, _b;
            }());
            exports_1("NotifService", NotifService);
        }
    };
});
//# sourceMappingURL=notif.service.js.map