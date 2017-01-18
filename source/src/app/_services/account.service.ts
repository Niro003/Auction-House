import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {

    constructor(private http: Http) {
        // set token if saved in local storage
    }
    error : string;
    register(username: string, password: string, birthdate: string, firstname: string, lastname: string, mail: string): Observable<boolean> {
        event.preventDefault();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/register',
            JSON.stringify({
                username: username,
                password: password,
                birthdate: birthdate,
                firstname: firstname,
                lastname: lastname,
                mail: mail
            }),
            {headers: headers, withCredentials: true})
            .map((response: Response) => {
                console.log(response);
                if (response.text() === "ok") {
                    // return true to indicate successful registration
                    return true;
                } else {
                    this.error = response.text();
                    alert(response.text());
                    // return false to indicate failed registration
                    return false;
                }
            });
    }

    updateUser(name: string, value: any, id: number): Observable<boolean> {
        event.preventDefault();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/update/user_profile',
            JSON.stringify({name: name, value: value, id: id}),
            {headers: headers, withCredentials: true})
            .map((response: Response) => {
                console.log(response);
                if (response.text() === "fail"){
                    return false;
                }
                return true;
            });
    }
}
