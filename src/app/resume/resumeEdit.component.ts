import { Component, OnInit } from '@angular/core';

//services
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'resume-edit',
  templateUrl: './resumeEdit.component.html',
  styleUrls: ['../app.component.css']
})
export class ResumeEditComponent implements OnInit {

  resume: any = {};
  username: string = "";
  isLoading: boolean = false;

  constructor(private authService: AuthService, 
              private dataService: DataService) { }

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

        console.log(this.resume);

      }).catch(this.handleErrors);
  }
}