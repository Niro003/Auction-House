import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {CookieService} from 'angular2-cookie/core';
import {NotificationsService} from "angular2-notifications";


@Injectable()
export class EbayService {

    constructor(private http: Http,private notificationService: NotificationsService) {}

    findProducts() : any {
        console.log("searching ebay products!");
        return this.http.get(`/api/get/ebay/product/:id`)
            .map((response: Response) => {
                console.log(response);
                if (response.text() === "fail"){
                    this.notificationService.error("Aborted","Finding a product failed");
                    return false;
                }
                this.notificationService.success("Success","Products have been found!");
                return response.json();
            });
    }
}
