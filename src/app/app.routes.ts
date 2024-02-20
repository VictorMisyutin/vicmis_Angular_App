import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DocsPageComponent } from './pages/docs-page/docs-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { DocsNBAComponent } from './pages/docs-nba/docs-nba.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'vicmis'},
    {path: 'docs', component: DocsPageComponent, title: 'Documentation'},
    {path: 'contact', component: ContactPageComponent, title: 'Contact Us'},
    {path: 'docs/NBA', component: DocsNBAComponent, title: 'NBA Documentation'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }