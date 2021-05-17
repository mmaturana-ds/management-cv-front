import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirm-dialog',
    styleUrls: ['./app.component.css'],
    template: `
        <h2 mat-dialog-title>{{template.title}}</h2>
        <mat-dialog-content class="mat-dialog-content">
            {{template.message}}
        </mat-dialog-content>
        <mat-dialog-actions class="mat-dialog-actions">
            <button mat-raised-button (click)="close()">Cancelar</button>
            <span class="sb-flex"></span>
            <button mat-raised-button color="primary" (click)="confirm()">Confirmar</button>
        </mat-dialog-actions>
    `
})
export class ConfirmDialogComponent {
    template: any;

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.template = data;
        }

    close() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close({ type: 'CLICK_CONFIRM' });
    }
}