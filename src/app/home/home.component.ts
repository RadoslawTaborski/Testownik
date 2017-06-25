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

  ngAfterViewInit() {
    
  }

}
