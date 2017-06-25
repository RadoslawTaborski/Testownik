import { Injectable } from '@angular/core';
import { Question } from './home/home.question';

@Injectable()
export class SharedService {
   static questions: Question[]=[];
}