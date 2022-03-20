import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() answer!: string;
  @Input() formGroup!: FormGroup;
  @Output() question!: Quiz;
  totalQuestions!: number;
  completionTime!: number;
  correctAnswersCount = 0;

  currentQuestion = 0;
  questionIndex: number;
  correctAnswer!: boolean;
  hasAnswer!: boolean;
  disabled!: boolean;
  quizIsOver!: boolean;
  progressValue!: number;
  timeLeft!: number;
  timePerQuestion = 20;
  interval: any;
  elapsedTime!: number;
  elapsedTimes!: number[];
  blueBorder = '2px solid #007aff';
  allQuestions:Quiz[];
  
  constructor(private route: ActivatedRoute, private router: Router, private quizService:QuizService) {}

  ngOnInit() {    
    this.quizService.get().subscribe(
      (data: Quiz[]) => {
        this.allQuestions = data;     
    this.question = this.getQuestion;
    this.questionIndex = 0;
    this.totalQuestions = this.allQuestions.length;
    this.timeLeft = this.timePerQuestion;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    this.countdown();
    this.route.paramMap.subscribe(params => {
      this.setQuestionID(+params.get('questionId')!);  // get the question ID and store it
      this.question = this.getQuestion;
    });
  });
  }

  displayNextQuestion() {
    this.resetTimer();
    this.increaseProgressValue();
    this.questionIndex++;
    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions && this.allQuestions.length >0 ) {
      document.getElementById('question')!.innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question')!.style.border = this.blueBorder;
    } else {
      this.navigateToResults();
    }
  }

  navigateToNextQuestion(): void {
    if (this.question.selectedOption === this.question.answer){
      this.correctAnswersCount++;
    }
    this.router.navigate(['/question', this.getQuestionID() + 1]);
    this.displayNextQuestion();
  }

  navigateToResults(): void {
    if (this.question.selectedOption === this.question.answer){
      this.correctAnswersCount++;
    }
    this.router.navigate(['/results'], { state:
      {
        totalQuestions: this.totalQuestions,
        correctAnswersCount: this.correctAnswersCount,
        completionTime: this.completionTime,
        allQuestions: this.allQuestions
      }
    });
  }

  // checks whether the question is valid and is answered correctly
  checkIfAnsweredCorrectly() {
    if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
    //  this.incrementCorrectAnswersCount();
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.disabled = false;

      this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
      if (this.getQuestionID() < this.totalQuestions) {
        this.elapsedTimes = [...this.elapsedTimes, this.elapsedTime];
      } else {
        this.elapsedTimes = [...this.elapsedTimes, 0];
      }
      this.quizDelay(3000);

      if (this.getQuestionID() < this.totalQuestions) {
        this.navigateToNextQuestion();
      } else {
        this.navigateToResults();
      }
    }
  }

  incrementCorrectAnswersCount() {
    if (this.questionIndex <= this.totalQuestions && this.isCorrectAnswer()) {
      if (this.correctAnswersCount === this.totalQuestions) {
        return this.correctAnswersCount;
      } else {
        this.correctAnswer = true;
        this.hasAnswer = true;
        return this.correctAnswersCount++;
      }
    } else {
      this.correctAnswer = false;
      this.hasAnswer = false;
      return 0;
    }
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() + 1) / this.totalQuestions).toFixed(1));
  }


  /****************  public API  ***************/
  getQuestionID() {
    return this.questionIndex;
  }

  setQuestionID(id: number) {
    return this.questionIndex = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionIndex <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.question.selectedOption === this.question.answer;
  }

  get getQuestion(): Quiz {
    return this.allQuestions.filter(
      question => question.questionId === this.questionIndex
    )[0];
  }

  // countdown clock
  private countdown() {
    if (this.questionIndex <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.checkIfAnsweredCorrectly();

          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            this.navigateToResults();
            this.quizIsOver = true;
          }

          // disable the next button until an option has been selected
          this.question.selectedOption === '' ? this.disabled = true : this.disabled = false;
        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  quizDelay(milliseconds:any) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }
}
