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

	constructor() {
		console.log("MyComp.constructor");
  }

   fileChanged($event):void {
    this.files = (<HTMLInputElement>document.getElementById("file")).files;
    for(let file of this.files){

		  var fileReader = new FileReader();

      fileReader.onloadend= function(e){
        SharedService.questions.push(new Question(this.result));
        //console.log(this.result);
      }
      fileReader.readAsText(file, 'windows-1250');
    }
  }

  ngOnInit() {
  }

}
