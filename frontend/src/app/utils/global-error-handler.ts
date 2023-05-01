import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { getClientMessage, getServerMessage } from './error-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(public snackBar: MatSnackBar) { }

    handleError(error: Error | HttpErrorResponse) {
        let message;

        if (error instanceof HttpErrorResponse) {
            message = getServerMessage(error);
        } else {
            message = getClientMessage(error);
        }

        this.snackBar.open(message, 'X', { panelClass: ['error'] });
        // console.error("GEH", error);
    }
}