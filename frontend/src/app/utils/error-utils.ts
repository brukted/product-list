import { HttpErrorResponse } from "@angular/common/http";

export function getServerMessage(error: HttpErrorResponse) {
    return error.error?.message ? error.error.message : error.message;
}

export function getClientMessage(error: Error): string {
    if (!navigator.onLine) {
        return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
}