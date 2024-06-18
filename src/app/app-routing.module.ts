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
import { ThirdwardarchiveComponent } from './pages/projects/thirdwardarchive/thirdwardarchive.component';
import { ThirdwardarchiveCheckoutComponent } from './pages/projects/thirdwardarchive-checkout/thirdwardarchive-checkout.component';
import { ThirdwardarchiveMerchComponent } from './pages/projects/thirdwardarchive-merch/thirdwardarchive-merch.component';
import { ThirdwardarchiveMerchDetailComponent } from './pages/projects/thirdwardarchive-merch-detail/thirdwardarchive-merch-detail.component';
import { ThirdwardarchiveLoginComponent } from './pages/projects/thirdwardarchive-login/thirdwardarchive-login.component';
import { ThirdwardarchiveAddProductComponent } from './pages/projects/thirdwardarchive-add-product/thirdwardarchive-add-product.component';
import { ThirdwardarchiveAdminViewComponent } from './pages/projects/thirdwardarchive-admin-view/thirdwardarchive-admin-view.component';
import { ThirdwardarchiveAdminProductsDetailsComponent } from './pages/projects/thirdwardarchive-admin-products-details/thirdwardarchive-admin-products-details.component';

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
  {path: 'thirdwardarchive', component: ThirdwardarchiveComponent, title: 'thirdwardarchive'},
  {path: 'thirdwardarchive/checkout', component: ThirdwardarchiveCheckoutComponent, title: 'thirdwardarchive'},
  {path: 'thirdwardarchive/merch', component: ThirdwardarchiveMerchComponent, title: 'thirdwardarchive'},
  {path: 'thirdwardarchive/login', component: ThirdwardarchiveLoginComponent, title: 'thirdwardarchive'},
  {path: 'thirdwardarchive/admin', component: ThirdwardarchiveAdminViewComponent, title: 'thirdwardarchive', canActivate: [authGuard]},
  {path: 'thirdwardarchive/admin/add-products', component: ThirdwardarchiveAddProductComponent, title: 'thirdwardarchive', canActivate: [authGuard]},
  {path: 'thirdwardarchive/admin/product-view', component: ThirdwardarchiveAdminProductsDetailsComponent, title: 'thirdwardarchive', canActivate: [authGuard]},
  {path: 'thirdwardarchive/merch/details', component: ThirdwardarchiveMerchDetailComponent, title: 'thirdwardarchive'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
