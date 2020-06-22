import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private user = JSON.parse(localStorage.getItem('user'));

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.user && this.user.access_token;

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
