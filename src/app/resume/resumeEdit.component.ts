import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common'

//services
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

//dialogs
import { AddExperienceDialogComponent } from './addExperienceDialog.component';
import { EditExperienceDialogComponent } from './editExperienceDialog.component';
import { AddSkillDialogComponent } from './addSkillDialog.component';
import { EditSkillDialogComponent } from './editSkillDialog.component';
import { ConfirmDialogComponent } from '../confirmDialog.component';


@Component({
  selector: 'resume-edit',
  templateUrl: './resumeEdit.component.html',
  styleUrls: ['../app.component.css']
})
export class ResumeEditComponent implements OnInit {
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
    this.isLoading = true;
    this.username = this.authService.getUserName();
    this.findResume(this.username);
  }

  findResume(username: string) {
    this.dataService.getCurriculum(username)
      .then(result => {
        this.resume = result;
        this.isLoading = false;

        let _fechaNacimiento;
        if(this.resume.fechaNacimiento && this.resume.fechaNacimiento.length > 0) _fechaNacimiento = formatDate(this.resume.fechaNacimiento, 'yyyy-MM-dd', 'en-US');

        this.resumeForm.setValue({
          nombre: this.resume.nombre,
          email: this.resume.email,
          fono: this.resume.fono,
          direccion: this.resume.direccion,
          fechaNacimiento: _fechaNacimiento,
          nacionalidad: this.resume.nacionalidad,
          avatar: this.resume.avatar,
          banner: this.resume.banner,
          nombreEmpresa: this.resume.nombreEmpresa,
          direccionEmpresa: this.resume.direccionEmpresa,
          introduccionCarta: this.resume.introduccionCarta,
          cuerpoCarta: this.resume.cuerpoCarta
        });

        this.skills = result.skills;
        this.experiences = result.experiences;
        this.studies = result.studies;
        this.urlAvatar = this.resume.avatar;
        this.urlBanner = this.resume.banner;

      }).catch(this.handleErrors);
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

    this.dataService.updateCurriculum({
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

  private deleteResume() {
    this.dataService.deleteCurriculum()
      .then(() => {
        this.router.navigate(['/']);
      }).catch(this.handleErrors); 
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

  openDeleteContentDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '360px',
        data: {
            title: 'Eliminar Currículum!',
            message: `Estás seguro de que desea eliminar tu currículum`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result.type === 'CLICK_CONFIRM' )
            this.deleteResume();
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