import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
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
  @ViewChild('wizardStepper') stepper: MatStepper;

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
}