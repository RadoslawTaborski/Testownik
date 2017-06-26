import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Question } from './home.question';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoaded = false;
  history: number[] = [];

  constructor() { }

  ngOnInit() {
    if (SharedService != null)
      this.isLoaded = true;
  }

  questions() {
    return SharedService.questions
  }

  allCounter() {
    return SharedService.allCounter;
  }

  goodCounter() {
    return SharedService.goodCounter;
  }

  clockText() {
    return SharedService.clockText;
  }

  check(quest: number) {
    let itWas = false;
    for (let item of this.history) {
      if (item == quest)
        itWas = true;
    }
    if (!itWas) {
      this.history.push(quest);
      let first = true;
      SharedService.allCounter++;
      let q: Question;
      for (let item of SharedService.questions) {
        if (item.index == quest) {
          q = item;
        }
      }

      q.result = 1;
      SharedService.goodCounter++;

      for (let item of q.answers) {
        if (item.value == true) {
          item.state = 1;
        }
        if (item.checked != item.value && first) {
          SharedService.goodCounter--;
          q.result = 0;
          first = false;
        }
      }
    }
  }

  ngAfterViewInit() {

  }

}
