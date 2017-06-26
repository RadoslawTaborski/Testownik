import { Component, OnInit } from '@angular/core';
import { Question } from '../home/home.question';
import { SharedService } from "../shared.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private lastScroll = 0;
  private isScrollingDown = false;
  private hideNavbar = false;
  private bgNavbar = false;
  private homeControler = false;

  appName = "Testownik";

  files: any = null;
  isFileReaderWork: boolean = false;
  counter: number = 0;
  fileName: string = "Wybierz pliki"
  err: boolean = false;

  constructor(private router: Router) {
    console.log("MyComp.constructor");
    router.events.subscribe((val) => {
      this.navStyle(val["url"]);
    });
  }

  navStyle(url) {
    if (url == '/home')
      this.homeControler = true;
    else
      this.homeControler = false;
  }

  fileChanged($event): void {
    this.err = false;
    this.reset();
    this.files = (<HTMLInputElement>document.getElementById("file")).files;

    let self = this;
    for (let file of this.files) {

      var fileReader = new FileReader();

      fileReader.onloadend = function (e) {
        if (<string>this.result.charAt(0) == 'X') {
          SharedService.questions.push(new Question(this.result, self.counter));
          self.counter++;
        } else {
          console.log("Błędna baza")
          self.err = true;
        }
      }
      if (self.err) {
        break;
      }
      fileReader.readAsText(file, 'windows-1250');
    }
  }

  reset() {
    SharedService.questions = [];
    SharedService.allCounter = 0;
    SharedService.goodCounter = 0;
    SharedService.clock = 0;
    SharedService.clockText="";
    SharedService.history=[];
    this.counter = 0;
  }

  resetQuestions() {
    for (let item of SharedService.questions) {
      item.result = 2;
      for (let ans of item.answers) {
        ans.checked = false;
        ans.state = 0;
      }
    }
  }

  randomSequence() {
    let tmp = SharedService.shuffle(SharedService.questions)
    this.reset();
    SharedService.questions = tmp;
    this.resetQuestions();
    window.scrollTo(0, 0);
  }

  questions() {
    return SharedService.questions;
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

  private counterClock() {
    let tmp=SharedService.clock++;
    let minutes= Math.floor(tmp/60);
    var formattedNumber1 = ("0" + minutes).slice(-2);
    let seconds= tmp-minutes*60;
    var formattedNumber2 = ("0" + seconds).slice(-2);
    SharedService.clockText=formattedNumber1+":"+formattedNumber2;
  }

  clock() {
    setInterval(() => this.counterClock(), 1000);
  }

  ngOnInit() {
    this.clock();
  }

  shoulHideNavbar() {
    if (this.lastScroll > 40 && this.isScrollingDown)
      this.hideNavbar = true;
    else
      this.hideNavbar = false;
  }

  onScroll($event) {
    var scroll = window.scrollY;
    this.isScrollingDown = scroll > this.lastScroll ? true : false;
    this.lastScroll = scroll;
    this.shoulHideNavbar();

    scroll > 80 ? this.bgNavbar = true : this.bgNavbar = false;
  }

}
