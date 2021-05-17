import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

//services
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

//dialogs
import { AddExperienceDialogComponent } from './addExperienceDialog.component';
import { EditExperienceDialogComponent } from './editExperienceDialog.component';
import { AddSkillDialogComponent } from './addSkillDialog.component';
import { EditSkillDialogComponent } from './editSkillDialog.component';


@Component({
  selector: 'resume-create',
  templateUrl: './resumeCreate.component.html',
  styleUrls: ['../app.component.css']
})
export class ResumeCreateComponent implements OnInit {
  @ViewChild('wizardStepper') stepper: MatStepper;

  resume: any = {};
  username: string = "";
  isLoading: boolean = false;
  saveState: boolean = false;

  resumeForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    fono: new FormControl(''),
    direccion: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    nacionalidad: new FormControl(''),
    avatar: new FormControl(''),
    banner: new FormControl(''),
    nombreEmpresa: new FormControl(''),
    direccionEmpresa: new FormControl(''),
    introduccionCarta: new FormControl(''),
    cuerpoCarta: new FormControl(''),
  });

  skills: Array<any> = [];
  experiences: Array<any> = [];
  studies: Array<any> = [];

  fileToUpload: File = null;
  urlAvatar: string = "";
  urlBanner: string = "";

  constructor(private authService: AuthService, 
              private dataService: DataService,
              public dialog: MatDialog,
              private router: Router) { }

  private handleErrors(error: any): Promise<any> {
    return Promise.reject(error);
  }

  ngOnInit() {
    this.username = this.authService.getUserName();
  }

  previousStep() {
      const index = this.stepper.selectedIndex,
          length = this.stepper._steps.length;

      if(index-1 > -1) this.stepper.previous();
  }

  nextStep() {
      const index = this.stepper.selectedIndex,
          length = this.stepper._steps.length;

      if(index+1 < length) this.stepper.next();
  }

  save() {
    this.saveState = true;

    this.dataService.createCurriculum({
      nombre: this.resumeForm.get('nombre').value,
      email: this.resumeForm.get('email').value,
      fono: this.resumeForm.get('fono').value,
      direccion: this.resumeForm.get('direccion').value,
      fechaNacimiento: this.resumeForm.get('fechaNacimiento').value,
      nacionalidad: this.resumeForm.get('nacionalidad').value,
      avatar: this.resumeForm.get('avatar').value,
      banner: this.resumeForm.get('banner').value,
      nombreEmpresa: this.resumeForm.get('nombreEmpresa').value,
      direccionEmpresa: this.resumeForm.get('direccionEmpresa').value,
      introduccionCarta: this.resumeForm.get('introduccionCarta').value,
      cuerpoCarta: this.resumeForm.get('cuerpoCarta').value,
      experiences: this.experiences,
      studies: this.studies,
      skills: this.skills

    }).then(() => this.router.navigate(['/resume-public/', this.username])).catch(this.handleErrors);
  }

  openAddExperienceDialog(): void {
    let dialogRef = this.dialog.open(AddExperienceDialogComponent, {
        width: '520px',
        data : {
          title: 'Agregar Experiencia'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          this.experiences.push(result.data);
        }
    });
  }

  openAddStudyDialog(): void {
    let dialogRef = this.dialog.open(AddExperienceDialogComponent, {
        width: '520px',
        data : {
          title: 'Agregar Studios'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          this.studies.push(result.data);
        }
    });
  }

  openAddSkillDialog(): void {
    let dialogRef = this.dialog.open(AddSkillDialogComponent, {
        width: '520px',
        data : {
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          this.skills.push(result.data);
        }
    });
  }

  editExperienceDialog(data): void {
    let dialogRef = this.dialog.open(EditExperienceDialogComponent, {
        width: '520px',
        data : {
          title: 'Editar Experiencia',
          form: data
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          
        }
    });
  }

  editStudyDialog(data): void {
    let dialogRef = this.dialog.open(EditExperienceDialogComponent, {
        width: '520px',
        data : {
          title: 'Editar Studios',
          form: data
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          
        }
    });
  }

  editSkillDialog(data): void {
    let dialogRef = this.dialog.open(EditSkillDialogComponent, {
        width: '520px',
        data : {
          form: data
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result && result.type === 'CLICK_SAVE') {    
          
        }
    });
  }

  uploadAvatar(event: any) {
    this.fileToUpload = event.target.files[0];
    this.dataService.uploadFile(this.fileToUpload)
      .then(resp => {
          this.urlAvatar = resp.url;
          this.resumeForm.patchValue({
            avatar: this.urlAvatar
          });
        })
      .catch(this.handleErrors);  
  }

  uploadBanner(event: any) {
    this.fileToUpload = event.target.files[0];
    this.dataService.uploadFile(this.fileToUpload)
      .then(resp => {
          this.urlBanner = resp.url;
          this.resumeForm.patchValue({
            banner: this.urlBanner
          });
        })
      .catch(this.handleErrors);  
  }
}