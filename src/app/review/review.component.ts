import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnChanges {
  @Output() answer = new EventEmitter<string>();
  @Output() formGroup!: FormGroup;
  @Input() question!: Quiz;
  option = '';
  grayBorder = '2px solid #979797';

  constructor() {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({answer: ''});
    }
  }

  buildForm() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });
  }

  radioChange(answer: string) {
    this.question.selectedOption = answer;
    this.answer.emit(answer);  
  }

  // mark the correct answer regardless of which option is selected once answered
  isCorrect(option: string): boolean {
    if( this.question.selectedOption && option === this.question.answer)
    return true;
    else
    return false;
  }

  // mark incorrect answer if selected
  isIncorrect(option: string): boolean {
    return option !== this.question.answer && option === this.question.selectedOption;
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }
}
