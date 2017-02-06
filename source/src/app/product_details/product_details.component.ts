/**
 * Created by grill on 03.02.2017.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { AuthenticationService } from '../_services/index';
import {EbayService} from "../_services/ebay.service";

@Component({
    selector : 'product_details.component',
    template: require('./product_details.component.html')
})

export class ProductDetailsComponent implements OnInit {
    details : any = {PictureURL:'../images/giphy.gif'};
    private sub: any;
    id : any;
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            this.getSingleItem();
            // In a real app: dispatch action to load the details here.
        });
    }

    constructor(private route: ActivatedRoute,
        private ebayService: EbayService) { }


    getSingleItem(){
        this.ebayService.getProductDetails(this.id)
            .subscribe((result : any) => {
                let erg = JSON.parse(result._body);
                console.log(erg);
   //             this.details = JSON.parse(result._body).item;
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
