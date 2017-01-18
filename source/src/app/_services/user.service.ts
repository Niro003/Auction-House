/**
 * Created by Nico on 27.11.2016.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(
        private http: Http) {
    }

    getUsers(): Observable<User[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // get users from api
        return this.http.get('/api/get/users', {headers: headers,withCredentials : true})
            .map((response: Response) => {
                console.log(response.json());
                return response.json();
            });
    }
}
