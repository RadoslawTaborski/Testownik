import { Injectable } from '@angular/core';
import { Question } from './home/home.question';

@Injectable()
export class SharedService {
    static questions: Question[] = [];
    static allCounter: number = 0;
    static goodCounter: number = 0;
    static clock: number =0;
    static clockText: string ="";
    static history: number[] = [];

    static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}