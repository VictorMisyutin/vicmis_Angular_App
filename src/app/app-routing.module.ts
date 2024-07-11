import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
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
import { ConnectionsComponent } from './pages/projects/connections/connections.component';
import { CreateConnectionsComponent } from './pages/projects/create-connections/create-connections.component';
import { CatalogedComponent } from './pages/projects/cataloged/cataloged.component';
import { LandingPageComponent } from './pages/flexgym/landing-page/landing-page.component';
import { ResultsPageComponent } from './pages/flexgym/results-page/results-page.component';
import { DataVizComponent } from './pages/projects/data-viz/data-viz.component';
import { MusicRankingsComponent } from './pages/projects/music-rankings/music-rankings.component';

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
  {path: 'projects/space-invaders', component: SpaceInvadersComponent, title: 'Space Invaders'},
  {path: 'projects/connections', component: ConnectionsComponent, title: 'connections'},
  {path: 'projects/cataloged', component: CatalogedComponent, title: 'cataloged'},
  {path: 'projects/connections/create', component: CreateConnectionsComponent, title: 'create connections'},
  {path: 'projects/data-viz', component: DataVizComponent, title: 'Data Visualization'},
  {path: 'liftware', component: LandingPageComponent, title: 'liftware'},
  {path: 'liftware/results', component: ResultsPageComponent, title: 'liftware'},
  {path: 'projects/music-ranking', component: MusicRankingsComponent, title: 'music ranking'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
