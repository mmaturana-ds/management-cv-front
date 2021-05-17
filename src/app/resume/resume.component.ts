import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//services
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'resume',
  templateUrl: './resume.component.html',
  styleUrls: ['../app.component.css']
})
export class ResumeComponent implements OnInit {
  username: string = "";
  currentPage: string = "/resume";

  constructor(private authService: AuthService,
              private dataService: DataService,
              private router: Router) {
                router.events.subscribe((event :any) => {
                  this.currentPage = event.url;

                  if(this.currentPage === "/resume") {
                    this.username = this.authService.getUserName();

                    this.dataService.getCurriculum(this.username)
                      .then(result => {
                        if(result) this.router.navigate(['/resume/edit']);
                        else this.router.navigate(['/resume/create']);
                      }).catch(this.handleErrors); 
                  }
                });
              }

  private handleErrors(error: any): Promise<any> {
    return Promise.reject(error);
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}