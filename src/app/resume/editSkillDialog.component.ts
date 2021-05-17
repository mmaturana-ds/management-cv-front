import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'edit-skill-dialog',
    styleUrls: ['../app.component.css'],
    template: `
        <h2 mat-dialog-title>Editar Habilidad</h2>
        <mat-dialog-content class="mat-dialog-content">
            <div class="sb-form-table">
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Nombre:
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <input matInput [(ngModel)]="form.nombre" maxlength="100">
                        </mat-form-field>
                    </div>
                </div>
                <div class="sb-form-table-cell">
                    <div class="sb-form-field">
                        <span class="sb-form-label">
                            Nota(1-100):
                        </span>
                        <mat-form-field class="sb-input-border sb-flex-display">
                            <input matInput [(ngModel)]="form.nota" type="number"  min="0" max="100">
                        </mat-form-field>
                    </div>
                </div>
            </div>
        </mat-dialog-content>

        <mat-dialog-actions class="mat-dialog-actions">
            <button mat-raised-button (click)="close()">Cancelar</button>
            <span class="sb-flex"></span>
            <button mat-raised-button color="primary" (click)="save()">Guardar</button>
        </mat-dialog-actions>
    `
})
export class EditSkillDialogComponent {
    form: any = {
        nombre: '',
        nota: ''
    }


    constructor(private dialogRef: MatDialogRef<EditSkillDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {
                if(data && data.form) {
                    this.form = data.form;
                }
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