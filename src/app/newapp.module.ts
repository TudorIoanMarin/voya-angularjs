// import { NgModule, forwardRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { UpgradeAdapter } from '@angular/upgrade';
//
// import { FooterComponent } from './core/footer/footer.component';
//
// declare var angular: any;
//
// const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
// forwardRef(() => MyAppModule)); // <-- notice forward reference
//
// angular.module('voya')
//   .directive('footerComponent', upgradeAdapter.downgradeNg2Component(FooterComponent))
//
// @NgModule({
//   declarations: [ ],
//   imports: [
//     CommonModule,
//     BrowserModule
//   ],
//   providers: [ ]
// })
// class MyAppModule { }
//
//
// upgradeAdapter.bootstrap(document.body, ['voya']);
