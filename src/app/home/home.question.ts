export class Question {
    question: string="";
    answers: Answer[]=[];
    index: number=0;
    result: number=2;

    constructor(data: string, num: number){
        let lines = data.split('\n');
        this.question=lines[1];
        this.index=num;
        for(let i=2; i<lines.length;++i) {
            this.answers[this.answers.length]=new Answer(lines[i],lines[0].charAt(i-1)=='1');
        }
    }
}

export class Answer {
    answer: string="";
    value: boolean=false;
    state: number=0;
    checked: boolean=false;

    constructor(answer: string, value: boolean){
        this.answer=answer;
        this.value=value;
    }
}