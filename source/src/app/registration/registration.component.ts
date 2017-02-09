import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../_services/account.service";
var validator = require('../../../node_modules/validator/validator');
@Component({
    selector : 'registration-component',
    template: require('./registration.component.html')
})

export class RegistrationComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        selectionTxtFontSize: '16px'
    };
    constructor(
        private router: Router,
        private accountService: AccountService) { }

    ngOnInit() {
        // you can not register if you are already logged in
    //    this.authenticationService.logout();
    }
    onDateChanged(event:any) {
        this.model.birthdate = event.formatted;
        console.log(this.model.birthdate);
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }
    ebayRegistration(){

    }
    register() {
        console.log("Triggered registration");
        this.loading = true;
        console.log(this.model.username+this.model.password+this.model.birthdate);
        if (!validator.isLength(this.model.username,{min : 4, max : 50})){
            this.error = "Client says: Username min:4 max:50 character";
            return;
        }
        if (!validator.isLength(this.model.password,{min : 4, max : 50})){
            this.error = "Client says: Password min:4 max:50 character";
            return;
        }
        if (!validator.isDate(this.model.birthdate)){
            this.error = "Client says: Invalid Birthdate";
            return;
        }
        if (!validator.isEmpty(this.model.mail)){
            if (!validator.isEmail(this.model.mail)){
                this.error = "Client says: Invalid E-Mail";
                return;
            }
        }
        if (!validator.isLength(this.model.firstname,{min : 0, max : 100})){
            this.error = "Client says: Invalid Firstname";
            return;
        }
        if (!validator.isLength(this.model.lastname,{min : 0, max : 100})){
            this.error = "Client says: Invalid Lastname";
            return;
        }

        this.accountService.register(this.model.username, this.model.password, this.model.birthdate,this.model.firstname,this.model.lastname,this.model.mail)
            .subscribe(result => {
                if (result === true){
                    // execute login
                    this.error = this.accountService.error;
                    this.router.navigate(['/login']);
                } else {
                    // something went wrong in the registration process
                    this.error = "Server says: "+this.accountService.error;
                    this.loading = false;
                }
            });
    }
}
