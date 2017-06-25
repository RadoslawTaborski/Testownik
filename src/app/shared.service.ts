import { Injectable } from '@angular/core';
import { Question } from './home/home.question';

@Injectable()
export class SharedService {
   static questions: Question[]=[];
   static allCounter: number=0;
   static goodCounter: number=0;
}