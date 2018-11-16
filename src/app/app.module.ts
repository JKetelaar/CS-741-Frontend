import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '@env/environment';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {HomeModule} from './home/home.module';
import {ShellModule} from './shell/shell.module';
import {AboutModule} from './about/about.module';
import {ProductsModule} from './product/products.module';
import {LoginModule} from './login/login.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {FooterComponent} from '@app/shell/footer/footer.component';
import {SearchModule} from '@app/search/search.module';
import {CookieService} from 'ngx-cookie-service';
import {CartModule} from '@app/cart/cart.module';
import {SlickModule} from 'ngx-slick';
import {AdminModule} from '@app/admin/admin.module';

@NgModule({
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        ShellModule,
        HomeModule,
        AboutModule,
        ProductsModule,
        LoginModule,
        SearchModule,
        CartModule,
        AdminModule,
        SlickModule.forRoot(),
        // Keep this module as last
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        FooterComponent
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
