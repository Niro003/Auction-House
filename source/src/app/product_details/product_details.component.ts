/**
 * Created by grill on 03.02.2017.
 */
import { Component, OnInit } from '@angular/core';



import { AuthenticationService } from '../_services/index';
import {EbayService} from "../_services/ebay.service";

@Component({
    template: require('./login.component.html')
})

export class ProductDetailsComponent implements OnInit {
    details : any;

    ngOnInit(){
        this.getSingleItem();
    }

    constructor(
        private authenticationService: AuthenticationService,
        private ebayService: EbayService) { }


    getSingleItem(){
        this.ebayService.getProductDetails('siiu')
            .subscribe((result : any) => {
                this.details = result;
                console.log(result);
            });
    }

}
