import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { Subscription } from "rxjs";

//services
import { DataService } from '../services/data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  searchForm = new FormGroup({
    name: new FormControl('')
  });

  resumens: Array<any> = [];

  constructor(private dataService: DataService) { }

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
    this.subscriptions.push(
      this.searchForm.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe((form): void => {
          this.findResume(form);
        })
    );

    this.dataService.getCurriculums()
      .then(result => this.resumens = result)
      .catch(this.handleErrors);    
  }

  findResume(form: any) {
    this.resumens = [];

    if(form && form.name) {
      this.dataService.getCurriculum(form.name)
        .then(result => this.resumens.push(result)).catch(this.handleErrors);

    } else {
      this.dataService.getCurriculums()
        .then(result => this.resumens = result)
        .catch(this.handleErrors);  
    }
  }
}