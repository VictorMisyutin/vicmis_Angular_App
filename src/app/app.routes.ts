import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DocsPageComponent } from './pages/docs-page/docs-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent, title: 'vicmis'},
    {path: 'docs', component: DocsPageComponent, title: 'Documentation'},
    {path: 'contact', component: ContactPageComponent, title: 'Contact Us'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }