import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DocsPageComponent } from './pages/docs-page/docs-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DocsNBAComponent } from './pages/docs-nba/docs-nba.component';
import { DocsCbbComponent } from './pages/docs-cbb/docs-cbb.component';
import { DocsMlbComponent } from './pages/docs-mlb/docs-mlb.component';
import { DocsPgaComponent } from './pages/docs-pga/docs-pga.component';
import { DocsSoccerComponent } from './pages/docs-soccer/docs-soccer.component';

DocsSoccerComponent
export const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'vicmis'},
    {path: 'docs', component: DocsPageComponent, title: 'Documentation'},
    {path: 'contact', component: ContactPageComponent, title: 'Contact Us'},
    {path: 'docs/nba', component: DocsNBAComponent, title: 'NBA Documentation'},
    {path: 'docs/cbb', component: DocsCbbComponent, title: 'CBB Documentation'},
    {path: 'docs/mlb', component: DocsMlbComponent, title: 'MLB Documentation'},
    {path: 'docs/pga', component: DocsPgaComponent, title: 'PGA Documentation'},
    {path: 'docs/soccer', component: DocsSoccerComponent, title: 'SOCCER Documentation'}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }