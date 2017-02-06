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
        return this.http.get(`/api/ebay/search`)
            .map((response: Response) => {
                if (response.text() === "fail"){
                    this.notificationService.error("Aborted","Finding a product failed");
                    return false;
                }
                this.notificationService.success("Success","Products have been found!");
                // we are getting a callback from the api! we have to extract the json out of it
                let data  = eval(response.text());
                console.log(data);
                return data.findItemsByKeywordsResponse[0];
            });
    }

    getProductDetails(id : any) : any {
        console.log("getting details of ebay item!");
        return this.http.get(`/api/ebay/product/` + id)
            .map((response: Response) => {
                if (response.text() === "fail"){
                    this.notificationService.error("Aborted","Finding a product failed");
                    return false;
                }
                this.notificationService.success("Success","Product details are loaded!");
                // we are getting a callback from the api! we have to extract the json out of it
                return response;
            });
    }
}
function _cb_findItemsByKeywords(data : any){
    return data;
}