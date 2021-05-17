import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'add-experience-dialog',
    styleUrls: ['../app.component.css'],
    template: `
        <h2 mat-dialog-title>{{title}}</h2>
        <mat-dialog-content class="mat-dialog-content">
            <div class="sb-form-table">
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Título:
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <textarea matInput [(ngModel)]="form.nombre" maxlength="100"
                                [matAutosizeMinRows]="3" [matTextareaAutosize]="true">
                            </textarea>
                        </mat-form-field>
                    </div>
                </div>
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Descripción:
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <textarea matInput [(ngModel)]="form.descripcion" maxlength="200"
                                [matAutosizeMinRows]="3" [matTextareaAutosize]="true">
                            </textarea>
                        </mat-form-field>
                    </div>
                </div>
            </div>
            <div class="sb-form-table">
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Fecha inicio:
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <input matInput type="date" [(ngModel)]="form.fechaInicio">
                        </mat-form-field>
                    </div>
                </div>
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Fecha fin:
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <input matInput type="date" [(ngModel)]="form.fechaFin">
                        </mat-form-field>
                    </div>
                </div>
            </div>
        </mat-dialog-content>

        <mat-dialog-actions class="mat-dialog-actions">
            <button mat-raised-button (click)="close()">Cancelar</button>
            <span class="sb-flex"></span>
            <button mat-raised-button color="primary" (click)="save()">Agregar</button>
        </mat-dialog-actions>
    `
})
export class AddExperienceDialogComponent {
    form: any = {
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: ''
    }
    title: string = "";

    constructor(private dialogRef: MatDialogRef<AddExperienceDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {
                this.title = data.title;
            }

    close() {
        this.dialogRef.close();    
    }

    save() {
        this.dialogRef.close({
            type: 'CLICK_SAVE',
            data: this.form
        });
    }
}