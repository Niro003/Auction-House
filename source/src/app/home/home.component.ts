import {Component} from '@angular/core';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})

export class HomeComponent {
    loggedIn : boolean = false;
    username : string;
    constructor() {
        try {
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            this.loggedIn = true;
        }catch (ex){
            this.loggedIn = false;
        }
    }

}
