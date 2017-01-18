import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';


import { AuthenticationService } from '../_services/index';

@Component({
    template: require('./changepassword.component.html')
})

export class ChangePasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private cookieService:CookieService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

    changePassword() {
        this.loading = true;
        console.log(this.cookieService.getAll());
        this.authenticationService.changePassword(this.model.currentPassword,this.model.confirmPassword, this.model.newPassword)
            .subscribe(result => {
                if (result === 'true') {
                    this.router.navigate(['/']);
                } else {
                    this.error = result;
                    this.loading = false;
                }
            });
    }
}
