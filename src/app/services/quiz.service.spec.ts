import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { Quiz } from '../models/quiz';
import {of} from 'rxjs';

describe('myService', () => {
  let service: QuizService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() =>{
     TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [QuizService]
     });
});

it('should be created', () => {   
  TestBed.configureTestingModule({});
  service = TestBed.inject(QuizService);
  expect(service).toBeTruthy();
});

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  service = new QuizService(httpClientSpy as any);
});

it('should return expected heroes (HttpClient called once)', () => {
  const expectedQues: Quiz[] =
    [{   
    
      "questionId": 1,
      "questionText": "Which Angular module is needed to use NgIf NgFor",
      "options": [
        { "optionValue": "1", "optionText": "BrowserModule." },
        { "optionValue": "2", "optionText": "CommonModule." },
        { "optionValue": "3", "optionText": "FormsModule." },
        { "optionValue": "4", "optionText": "HttpClientModule." }
      ],
      "answer": "2",
      "explanation": "CommonModule is the correct answer",
      "selectedOption": ""
    },
    {   
    
      "questionId": 2,
      "questionText": "Which Angular module is needed to use NgIf NgFor",
      "options": [
        { "optionValue": "1", "optionText": "BrowserModule." },
        { "optionValue": "2", "optionText": "CommonModule." },
        { "optionValue": "3", "optionText": "FormsModule." },
        { "optionValue": "4", "optionText": "HttpClientModule." }
      ],
      "answer": "2",
      "explanation": "CommonModule is the correct answer",
      "selectedOption": ""
    }];

  httpClientSpy.get.and.returnValue(of(expectedQues));

  service.get().subscribe(
    heroes => expect(heroes).toEqual(expectedQues, 'expected Ques'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});


});