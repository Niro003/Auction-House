import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from "../_services/account.service";
import {EbayService} from "../_services/ebay.service";

@Component({
    selector : 'product_search.component',
    template: require('./product_search.component.html')
})

export class ProductSearchComponent implements OnInit {
    products: any;
    private sub: any;
    id : any;
    constructor(private route: ActivatedRoute,
        private ebayService: EbayService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number
            console.log(this.id);
            this.ebayService.findProducts(this.id)
                .subscribe((result : any) => {
                    this.products = result.searchResult[0].item;
                    console.log(this.products);
                });
            // In a real app: dispatch action to load the details here.
        });


    }

}
