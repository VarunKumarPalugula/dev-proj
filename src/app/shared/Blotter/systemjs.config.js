/**
 * System configuration for deployment without installing /ucf/node_modules Loads umd
 * packages from the web instead Adjust as necessary for your application needs.
 */
(function(global) {
	System
			.config({
				meta : { '/ucf/node_modules/jqwidgets-scripts/jqwidgets/jqxcore.js': { format: 'global' },					  
					  	 '/ucf/node_modules/jqwidgets-scripts/jqwidgets/jqxchart.core.js': { format: 'global' },
					  	 '/ucf/node_modules/jqwidgets-scripts/jqwidgets/jqxdraw.js': { format: 'global' },
					  	 '/ucf/node_modules/jqwidgets-scripts/jqwidgets/jqxdata.js': { format: 'global' }
				
				},
				paths : {
					'npm:' : 'https://unpkg.com/' // path serves as alias
				},
				// map tells the System loader where to look for things
				map : {
					//'blotter" : '/ucf/app/shared/Blotter/',
					app : '/ucf/app',
					// location of transpiled app files
					'@angular/core' : '/ucf/node_modules/@angular/core/bundles/core.umd.min.js',
					'@angular/common' : '/ucf/node_modules/@angular/common/bundles/common.umd.min.js',
					'@angular/compiler' : '/ucf/node_modules/@angular/compiler/bundles/compiler.umd.min.js',
					'@angular/platform-browser' : '/ucf/node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',					
					'@angular/platform-browser-dynamic' : '/ucf/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
					'@angular/http' : '/ucf/node_modules/@angular/http/bundles/http.umd.min.js',
					'@angular/router' : '/ucf/node_modules/@angular/router/bundles/router.umd.min.js',					
					'@angular/forms' : '/ucf/node_modules/@angular/forms/bundles/forms.umd.min.js',
					'@angular/animations': '/ucf/node_modules/@angular/animations/bundles/animations.umd.min.js',
					'@angular/material' : '/ucf/node_modules/@angular/material/bundles/material.umd.min.js',
					'angular2-perfect-scrollbar': '/ucf/node_modules/angular2-perfect-scrollbar/bundles/angular2-perfect-scrollbar.umd.min.js',
					'rxjs' : '/ucf/node_modules/rxjs',					
					'jqwidgets': '/ucf/node_modules/jqwidgets-scripts/jqwidgets-ts',
					'@ngx-translate/core': '/ucf/node_modules/@ngx-translate/core/bundles/core.umd.js',
					'@ngx-translate/http-loader': '/ucf/node_modules/@ngx-translate/http-loader/bundles/http-loader.umd.js',
					'@angular/common/http': '/ucf/node_modules/@angular/common/bundles/common-http.umd.min.js',
					'tslib':'/ucf/node_modules/tslib/tslib.js'
				},
				// packages tells the System loader how to load when no filename
				// and/or no extension
				packages : {
					app : {						
						defaultExtension : 'js'
					},
					/*blotter : {
						main : './main.js',
						defaultExtension : 'js'
					},*/
					rxjs : {
						defaultExtension : 'js'
					},					
					jqwidgets:{
						defaultExtension : 'ts'
					}
				}
			});
})(this);