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
    console.log("check!"+ quest);
    let body=(<HTMLInputElement>document.getElementById(quest))
    let q=SharedService.questions[quest];
    q.result=1;
    for(let item of q.answers){
      if(item.value==true){
        item.state=1;
      }
      if(item.checked!=item.value){
        q.result=0;
      }
    }
  }

  ngAfterViewInit() {
    
  }

}
