import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../_services/account.service";
import {EbayService} from "../_services/ebay.service";

@Component({
    selector : 'product_search.component',
    template: require('./product_search.component.html')
})

export class ProductComponent implements OnInit {
    model: any = {};
    constructor(
        private ebayService: EbayService) { }

    ngOnInit() {
        this.ebayService.findProducts()
            .subscribe((result : any) => {
                console.log(result);
            });
    }

}
