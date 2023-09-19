import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmBoxService } from './blog/shared/service/confirm-box/confirm-box.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './blog/shared/service/auth/auth.service';
import { ApiHeaderInterceptor } from './blog/shared/interceptors/api-header/api-header.interceptor';
import { MaterialModule } from './shared/module/material.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderInterceptor } from './blog/shared/interceptors/loader/loader.interceptor';
import { ErrorHandlingInterceptor } from './blog/shared/interceptors/api-error-handling/error-handling.interceptor';

@NgModule({
  declarations: [AppComponent, LoaderComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ConfirmBoxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
