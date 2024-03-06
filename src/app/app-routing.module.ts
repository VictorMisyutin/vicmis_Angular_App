import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DocsCbbComponent } from './pages/docs/docs-cbb/docs-cbb.component';
import { DocsMlbComponent } from './pages/docs/docs-mlb/docs-mlb.component';
import { DocsNbaComponent } from './pages/docs/docs-nba/docs-nba.component';
import { DocsPageComponent } from './pages/docs/docs-page/docs-page.component';
import { DocsPgaComponent } from './pages/docs/docs-pga/docs-pga.component';
import { DocsSoccerComponent } from './pages/docs/docs-soccer/docs-soccer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectPageComponent } from './pages/projects/project-page/project-page.component';
import { SudokuComponent } from './pages/projects/sudoku/sudoku.component';
import { TypingComponent } from './pages/projects/typing/typing.component';
import { CollisionResolutionComponent } from './pages/projects/collision-resolution/collision-resolution.component';
import { SpaceInvadersComponent } from './pages/projects/space-invaders/space-invaders.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'vicmis'},
  {path: 'docs', component: DocsPageComponent, title: 'Documentation'},
  {path: 'contact', component: ContactComponent, title: 'Contact Us'},
  {path: 'docs/nba', component: DocsNbaComponent, title: 'NBA Documentation'},
  {path: 'docs/cbb', component: DocsCbbComponent, title: 'CBB Documentation'},
  {path: 'docs/mlb', component: DocsMlbComponent, title: 'MLB Documentation'},
  {path: 'docs/pga', component: DocsPgaComponent, title: 'PGA Documentation'},
  {path: 'docs/soccer', component: DocsSoccerComponent, title: 'Soccer Documentation'},
  {path: 'projects', component: ProjectPageComponent, title: 'Projects'},
  {path: 'projects/sudoku', component: SudokuComponent, title: 'Sudoku'},
  {path: 'projects/typing', component: TypingComponent, title: 'Typing Game'},
  {path: 'projects/collision', component: CollisionResolutionComponent, title: 'Collision Resolution'},
  {path: 'projects/space-invaders', component: SpaceInvadersComponent, title: 'Space Invaders'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
