import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { GENERAL_SNACKBAR_ERROR } from "../constants/constants";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    snackBar = inject(MatSnackBar);
    router = inject(Router);

    constructor() {}

    public errorSnackbarCreator(message: string): void {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.horizontalPosition = "left";
        config.verticalPosition = "bottom";
        config.panelClass = ["snippet-snackbar", "snackbar-error"];
        this.snackBar.open(message ?? GENERAL_SNACKBAR_ERROR, "Close", config);
    }

    public infoSnackbarCreator(message: string): void {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.horizontalPosition = "left";
        config.verticalPosition = "bottom";
        config.panelClass = ["snippet-snackbar", "snackbar-info"];
        this.snackBar.open(message, "Close", config);
    }

    public successSnackbarCreator(message: string): void {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.horizontalPosition = "left";
        config.verticalPosition = "bottom";
        config.panelClass = ["snippet-snackbar", "snackbar-success"];
        this.snackBar.open(message, "Close", config);
    }

    handleError(message: string, status: unknown): void {
        if (message === "Authorization token expired." && status === 401) {
            this.errorSnackbarCreator("Auth token has expired. Please log in again.");
            localStorage.removeItem("authToken");
            this.router.navigate(["login"]).then();
        } else if (message === "Content layout not found.") {
            this.errorSnackbarCreator("Layouts not found.");
        } else {
            this.errorSnackbarCreator(message);
        }
    }

    handleErrorWithoutSnackbar(message: string, status: unknown): void {
        if (message === "Authorization token expired." && status === 401) {
            this.errorSnackbarCreator("Auth token has expired. Please log in again.");
            localStorage.removeItem("authToken");
            this.router.navigate(["login"]).then();
        }
    }
}
