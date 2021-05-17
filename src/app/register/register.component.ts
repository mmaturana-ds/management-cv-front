import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl:'./register.component.html' ,
  styleUrls: ['../app.component.css']
})

export class RegisterComponent implements OnInit {
    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                public snackBar: MatSnackBar) { }

    signupForm: FormGroup;
    users: any;
    error: string;
    regMessage: string;
    isLoading: boolean;
    isOrgExists: number = 0;
    disabledRegister: boolean = false;


    ngOnInit() {
      this.isOrgExists = parseInt(this.route.snapshot.queryParams['orgexists'], 0);

      this.signupForm = new FormGroup({ 
        'username': new FormControl("",[Validators.required]),
        'email': new FormControl("",[Validators.required]),
        'password': new FormControl(null,Validators.required)
      });
    }

    private handleErrors(error: any): Promise<any> {
      return Promise.reject(error);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }

    signup() {
      const form = {
        nombre: this.signupForm.get('username').value,
        nombreUsuario: this.signupForm.get('username').value,
        email: this.signupForm.get('email').value,
        password: this.signupForm.get('password').value
      }

      if(form.nombreUsuario && form.email && form.password) {
        this.isLoading = true;
        this.disabledRegister = true;

        this.authService.createUser(form)
          .then(result => {
            if(result) {
              this.isLoading = false;
              this.router.navigate(['/login']);
            }

          }).catch(result => {
            this.isLoading = false;
            this.disabledRegister = false;
            this.regMessage = result.error.mensaje;
          });
      } else {
        this.openSnackBar(`Completa todo los campos.`, 'Ok');
      }
    }
}
