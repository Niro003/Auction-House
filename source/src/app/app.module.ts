import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AuthenticationService, UserService, AccountService } from './_services/index';
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from './chat/chat.component'
import {UsermanagementComponent} from './usermanagement/usermanagement.component';
import {RegistrationComponent} from './registration/registration.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MyDatePickerModule } from 'mydatepicker';
import { Angular2DataTableModule } from 'angular2-data-table';
import {InlineEditorModule} from 'ng2-inline-editor';
import {ChangePasswordComponent} from './change_password/changepassword.component'
import {SimpleNotificationsModule} from "angular2-notifications";
import {MomentModule} from "angular2-moment";
import {ProductSearchComponent} from "./product_search/product_search.component";
import {EbayService} from "./_services/ebay.service";
import {ProductDetailsComponent} from "./product_details/product_details.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        LoginComponent,
        RegistrationComponent,
        UsermanagementComponent,
        ChangePasswordComponent,
        ChatComponent,
        ProductSearchComponent,
        ProductDetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        MyDatePickerModule,
        Angular2DataTableModule,
        InlineEditorModule,
        SimpleNotificationsModule,
        MomentModule
    ],
    providers: [AuthenticationService,AccountService,appRoutingProviders,CookieService,UserService,EbayService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
