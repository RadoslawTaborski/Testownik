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
  err:boolean=false;

	constructor() {
		console.log("MyComp.constructor");
  }

   fileChanged($event):void {
    this.err=false;
    this.reset();
    this.files = (<HTMLInputElement>document.getElementById("file")).files;

    let self=this;
    for(let file of this.files){

		  var fileReader = new FileReader();

      fileReader.onloadend= function(e){
        if(<string>this.result.charAt(0)=='X'){
          SharedService.questions.push(new Question(this.result, self.counter));
          self.counter++;
        }else{
            console.log("Błędna baza")
            self.err=true;
        }
      }
      if(self.err){
        break;
      }
      fileReader.readAsText(file, 'windows-1250');
    }
  }

  reset(){
    SharedService.questions=[];
    SharedService.allCounter=0;
    SharedService.goodCounter=0;
    this.counter=0;
  }

  randomSequence(){
    let tmp=SharedService.shuffle(SharedService.questions)
    this.reset();  
    SharedService.questions=tmp;
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
