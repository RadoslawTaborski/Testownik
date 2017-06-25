import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Question } from './home.question';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoaded=false;
	constructor() {  }

  ngOnInit() {
    if(SharedService != null)
      this.isLoaded=true;
  }

  questions() {
    return SharedService.questions
  }

  check(quest: any){
    let first=true;
    SharedService.allCounter++;
    let q=SharedService.questions[quest];
    q.result=1;
    SharedService.goodCounter++;

    for(let item of q.answers){
      if(item.value==true){
        item.state=1;
      }
      if(item.checked!=item.value && first){
        SharedService.goodCounter--;
        q.result=0;
        first=false;
      }
    }
  }

  ngAfterViewInit() {
    
  }

}
