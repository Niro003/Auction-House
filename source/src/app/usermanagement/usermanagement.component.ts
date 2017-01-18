import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {AccountService} from "../_services/account.service";

@Component({
    template: require('./usermanagement.component.html')
})

export class UsermanagementComponent implements OnInit {
    constructor(
        private router: Router,
        private userService: UserService,
        private accountService : AccountService) { }

    rows : any = [];
    columns : any = [];

    saveEditable(value : any,name : any, row : any) {
        this.accountService.updateUser(name,value,row.iduser_profile)
            .subscribe(result => {
                if (result) {
                    alert("Update has been conducted");
                }else{
                    alert("You can not change this row. Please select your own!");
                }
            });
        //call to http service
        console.log(value);
    }


    ngOnInit() {
        this.userService.getUsers()
            .subscribe(result => {
                var i = 0;
                var temp : any  = [];
                for (let key of Object.keys(result[0])){
                    if (!(key === "iduser_profile" || key === "iduser")) {
                        temp[i] = {prop: key, name: key.charAt(0).toUpperCase() + key.slice(1)};
                        i++;
                    }
                }
                this.columns = temp;
                for (let object of result){
                    this.rows.push(object);
                }
                console.log(this.columns);
                console.log(this.rows);

            });
    }
}
