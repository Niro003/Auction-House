import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';


import { AuthenticationService } from '../_services/index';

@Component({
    template: require('./login.component.html')
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private cookieService:CookieService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout()
            .subscribe(result => {
                if (result === true) {
                    alert("Logged OUT!")
                } else {

                }
            });;
    }

    login() {
        this.loading = true;
        console.log(this.cookieService.getAll());
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
