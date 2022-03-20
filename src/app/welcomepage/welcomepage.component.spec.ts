import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { WelcomepageComponent } from './welcomepage.component';
import { QuizService } from '../services/quiz.service';


describe('WelcomepageComponent', () => {
  let component: WelcomepageComponent;
  let fixture: ComponentFixture<WelcomepageComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const quizServiceSpy = jasmine.createSpyObj('QuizService', ['get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomepageComponent ],
      providers: [
        {provide: QuizService, useValue: quizServiceSpy}, {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  });
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ WelcomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title in a span tag', () => { 
    const fixture = TestBed.createComponent(WelcomepageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Angular Online Test');
  });

  it('button click', async () => {
    spyOn(component, 'startQuiz');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.startQuiz).toHaveBeenCalled();
    });
  });
  it('should create componet', () => {
    expect(component).toBeDefined();
  });

  
  it('should tell ROUTER to navigate when startQuiz clicked', () => {
    component.startQuiz() 
  
    // args passed to router.navigateByUrl() spy
    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    
    expect(navArgs).toBe('/question/1', 'should nav to QuestionDetail for first question');
  });
});
