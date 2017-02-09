import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AccountService} from "../_services/account.service";
import {EbayService} from "../_services/ebay.service";

@Component({
    selector : 'ebay-registration-component',
    template: require('./ebay_registration.html')
})

export class EbayRegistrationComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,private ebayService: EbayService) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params)
            let code = params['code'];
            this.ebayService.getAccessToken(code)
                .subscribe((result : any) => {
                    console.log(result);
                });
        });
    }

}
