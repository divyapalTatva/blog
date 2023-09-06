import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxComponent } from './modules/blog/sharedComponent/confirm-box/confirm-box.component';
import { ConfirmBoxService } from './modules/blog/Service/confirm-box.service';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
  ],
  providers: [ConfirmBoxService],
  bootstrap: [AppComponent],
})
export class AppModule {}
