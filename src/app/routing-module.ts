import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

const appRoutes: Routes = [
{path:'welcome',component:WelcomepageComponent},
{ path:'question', component: QuizComponent },
{ path:'question/:questionId', component: QuizComponent },
{ path:'results', component: ResultComponent },
{path:'**', redirectTo:'welcome'}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
exports:[RouterModule]
})
export class RoutingModule { }
