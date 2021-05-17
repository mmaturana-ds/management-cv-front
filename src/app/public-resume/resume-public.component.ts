import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from "rxjs";

//services
import { DataService } from '../services/data.service';

@Component({
  selector: 'resume',
  templateUrl: './resume-public.component.html',
  styleUrls: ['./resume-public.component.css']
})
export class ResumePublicComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  resume: any = {};
  username: string = "";
  isLoading: boolean = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,) { }

  private handleErrors(error: any): Promise<any> {
    return Promise.reject(error);
  }

  ngOnDestroy() {
    for (let i = 0, len = this.subscriptions.length; i < len; i++) {
        const _subscription = this.subscriptions[i];
        _subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.isLoading = true;

    this.route.queryParams.subscribe((params: Params) => {
      const _username = params['username'];

      if(_username && _username.length > 0){
        this.username = _username;
        this.findResume(this.username);
      } 
    });

    this.route.params.subscribe((params: Params) => {
      const _username = params['username'];

      if(_username && _username.length > 0) {
        this.username = _username;
        this.findResume(this.username);
      }
    });
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