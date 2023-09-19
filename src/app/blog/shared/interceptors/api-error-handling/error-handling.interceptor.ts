import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BlogStaticMessage } from '../../static/blogResponseMessage';
import { ConfirmBoxService } from '../../service/confirm-box/confirm-box.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(
    private toaster: ToastrService,
    private confirmBox: ConfirmBoxService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          localStorage.removeItem('token');
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
          console.log(errorMsg);
          this.toaster.error(BlogStaticMessage.SomethingWentWrong);
        } else {
          localStorage.removeItem('token');
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          console.log(errorMsg);
          this.toaster.error(BlogStaticMessage.InternalServerError);
        }
        this.confirmBox
          .openAuthDialogue(BlogStaticMessage.BlogDeleteConfirmation)
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              this.toaster.success('login done successfully');
            } else {
              this.toaster.error(BlogStaticMessage.SomethingWentWrong);
            }
          });
        return throwError(errorMsg);
      })
    );
  }
}
