import { Component, OnInit } from '@angular/core';
import { Question } from '../home/home.question';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appName = "Testownik";

  files: any = null;
	isFileReaderWork: boolean = false;
  counter: number=0;
  fileName: string="Wybierz bazę"

	constructor() {
		console.log("MyComp.constructor");
  }

   fileChanged($event):void {
    SharedService.questions=[];
    SharedService.allCounter=0;
    SharedService.goodCounter=0;
    this.counter=0
    this.files = (<HTMLInputElement>document.getElementById("file")).files;

    let self=this;
    for(let file of this.files){

		  var fileReader = new FileReader();

      fileReader.onloadend= function(e){
        SharedService.questions.push(new Question(this.result, self.counter));
        self.counter++;
      }
      fileReader.readAsText(file, 'windows-1250');
    }
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

  ngOnInit() {
  }

}
