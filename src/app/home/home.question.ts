export class Question {
    question: string="";
    answers: Answer[]=[];

    constructor(data: string){
        let lines = data.split('\n');
        this.question=lines[1];
        for(let i=2; i<lines.length;++i) {
            this.answers[this.answers.length]=new Answer(lines[i],lines[0].charAt(i-1)=='1');
        }
    }
}

export class Answer {
    answer: string="";
    value: boolean=false;
    constructor(answer: string, value: boolean){
        this.answer=answer;
        this.value=value;
    }
}