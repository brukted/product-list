import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomHttpClient extends HttpClient {
    constructor(httpHandler: HttpHandler) {
        super(httpHandler);
    }
}
