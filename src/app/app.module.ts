import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxService } from './blog/shared/service/confirm-box/confirm-box.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiHeaderInterceptor } from './blog/shared/interceptors/api-header.interceptor';
import { AuthService } from './blog/shared/service/auth/auth.service';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    HttpClientModule,
  ],
  providers: [
    ConfirmBoxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
