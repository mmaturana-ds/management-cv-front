import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//services
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({ 
    'username': new FormControl("",[Validators.required]),
    'password': new FormControl(null,Validators.required)
  });
  users: any;
  error: string = "";
  organizations: any;
  loginmessage: string = "";
  isLoading: boolean = false;
  disabledLogin: boolean = false;

  constructor(private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    
  }

  login() {
    const user = this.signupForm.get('username')!.value,
      password = this.signupForm.get('password')!.value;

    if(user && password) {
      this.isLoading = true;
      this.disabledLogin = true;
      this.authService.login(user, password)
        .then(result => {
          this.authService.setToken(result.token);
          this.authService.setUserName(user);
          this.router.navigate(['/resume']);

        }).catch(result => {
          this.disabledLogin = false;
          this.isLoading = false;
          this.loginmessage = "usuario o contraseña inválidos";
        });
    }
  }
}