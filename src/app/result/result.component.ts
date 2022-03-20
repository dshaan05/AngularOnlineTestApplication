import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../models/quiz'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() answer!: string ;
  @Input() question!: Quiz ;
  totalQuestions!: number;
  allQuestions!: Quiz[];
  correctAnswersCount!: number;
  percentage!: number ;
  completionTime!: number;
  elapsedMinutes!: number ;
  elapsedSeconds!: number ;
  codelabUrl = 'http://localhost:3000/data';
  
  constructor(public router: Router) {   
    if (this.router.getCurrentNavigation()){
    this.totalQuestions = this.router.getCurrentNavigation().extras.state.totalQuestions;
    this.correctAnswersCount = this.router.getCurrentNavigation().extras.state.correctAnswersCount;
    this.completionTime = this.router.getCurrentNavigation().extras.state.completionTime;
   this.allQuestions = this.router.getCurrentNavigation().extras.state.allQuestions;  
    }
  }

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;
    this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);
  }
}
