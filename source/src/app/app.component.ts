import {Component, OnInit} from '@angular/core';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/main.css';
import 'angular2-data-table/release/material.css';
import 'angular2-data-table/release/datatable.css';
import 'font-awesome/css/font-awesome.css';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
    selector: 'my-app',
    template: require('./app.component.html')
})

export class AppComponent implements OnInit {
    inpProduct : any = "";
    constructor(
        private authenticationService: AuthenticationService) { }
    public options = {
        position: ["bottom", "left"],
        timeOut: 5000,
        lastOnBottom: true
    }
   /* loggedIn : boolean = false;
    username : string;
    constructor() {
        try {
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            this.loggedIn = true;
        }catch (ex){
            this.loggedIn = false;
        }
    } */
    ngOnInit() {
        console.log('AppComponent initializing...');
    }
    findProduct(){

    }

}
