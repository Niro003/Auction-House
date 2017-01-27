import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {CookieService} from 'angular2-cookie/core';


@Injectable()
export class AuthenticationService {

    constructor(private cookieService:CookieService,private http: Http) {

    }
    notLoggedIn = true;
    login(username: string, password: string): Observable<boolean> {
        event.preventDefault();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/login', JSON.stringify({ username: username, password: password }),
            {headers: headers,withCredentials : true})
            .map((response: Response) => {
                console.log(response);
                if (response.text() !== "fail") {
                    this.notLoggedIn = false;
                    // store username
                    localStorage.setItem('currentUser',response.text());
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    changePassword(currentPassword: string, confirmPassword: string, newPassword : string): Observable<string> {
        event.preventDefault();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/new/password',
            JSON.stringify({ currentPassword: currentPassword, confirmPassword: confirmPassword, newPassword:newPassword }),
            {headers: headers,withCredentials : true})
            .map((response: Response) => {
                console.log(response);
                if (response.text() === "ok") {
                    alert("Password change successful");
                    // return true to indicate successful login
                    return 'true';
                } else {
                    // return false to indicate failed login
                    return response.text();
                }
            });
    }

    logout(): Observable<boolean> {
        console.log("logging out!");
        localStorage.removeItem('currentUser');
        // clear session on the server
        console.log(this.cookieService.get("connect.sid"));
        if (this.cookieService.get("connect.sid") === undefined) {
            return Observable.of(false);
        } else {
            return this.http.get('/api/logout')
                .map((response: Response) => {
                    console.log(response.text());
                    if (response.text() === "success") {
                        this.notLoggedIn = true;
                        localStorage.clear();
                        this.cookieService.remove("connect.sid");
                        return true;
                    } else {
                        return false;
                    }
                });
        }
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
