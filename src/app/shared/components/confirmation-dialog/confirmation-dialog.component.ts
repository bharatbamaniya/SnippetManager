import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { NgClass, NgStyle } from "@angular/common";

export type ConfirmationDialogData = {
    forAction?: string;
    consequences?: string;
    confirmActionLabel?: string;
    confirmActionClass?: string;
    cancelActionLabel?: string;
};

@Component({
    selector: "app-confirmation-dialog",
    standalone: true,
    imports: [MatDialogModule, MatButton, NgStyle, NgClass],
    template: `
      <section class="width-650">
        <h4 mat-dialog-title class="color-dark-primary text-center mb-2">Are you sure you want to {{ data.forAction ?? "proceed" }}</h4>
        @if (data.consequences) {
          <mat-dialog-content class="overflow-hidden mat-typography width-650">
            <p mat-dialog-title class="text-center">{{ data.consequences }}</p>
          </mat-dialog-content>
        }
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close="true" [ngClass]="data.confirmActionClass">
            {{ data.confirmActionLabel ?? "Yes" }}
          </button>
          <button mat-stroked-button mat-dialog-close="false">{{ data.cancelActionLabel ?? "No" }}</button>
        </mat-dialog-actions>
      </section>`,
    styleUrl: "./confirmation-dialog.component.scss",
})
export class ConfirmationDialogComponent {
    data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

    constructor() {
        this.data ??= {};
    }
}
