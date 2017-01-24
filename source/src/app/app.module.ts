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


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        LoginComponent,
        RegistrationComponent,
        UsermanagementComponent,
        ChangePasswordComponent,
        ChatComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        MyDatePickerModule,
        Angular2DataTableModule,
        InlineEditorModule
    ],
    providers: [AuthenticationService,AccountService,appRoutingProviders,CookieService,UserService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
