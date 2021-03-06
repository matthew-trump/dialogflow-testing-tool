import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BackendApiService } from './backend-api.service';

const API_PATH: string = environment.server.apiPath;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public backendApiService: BackendApiService) {

    }
    intercept(req: HttpRequest<any>,

        next: HttpHandler): Observable<HttpEvent<any>> {

        const l = document.createElement("a");
        l.href = req.url;

        if (l.pathname.startsWith(API_PATH)) {
            const idToken = localStorage.getItem("id_token");
            if (idToken) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + idToken)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }

    }
}
