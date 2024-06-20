import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { LiftwareHeaderComponent } from './pages/flexgym/components/liftware-header/liftware-header.component';
import { DataVizComponent } from './pages/projects/data-viz/data-viz.component';
import { ThirdwardarchiveComponent } from './pages/projects/thirdwardarchive/thirdwardarchive.component';
import { ThirdwardarchiveCheckoutComponent } from './pages/projects/thirdwardarchive-checkout/thirdwardarchive-checkout.component';
import { ThirdwardarchiveMerchComponent } from './pages/projects/thirdwardarchive-merch/thirdwardarchive-merch.component';
import { ThirdwardarchiveMerchDetailComponent } from './pages/projects/thirdwardarchive-merch-detail/thirdwardarchive-merch-detail.component';
import { ThirdwardarchiveLoginComponent } from './pages/projects/thirdwardarchive-login/thirdwardarchive-login.component';
import { ThirdwardarchiveAddProductComponent } from './pages/projects/thirdwardarchive-add-product/thirdwardarchive-add-product.component';
import { ThirdwardarchiveAdminViewComponent } from './pages/projects/thirdwardarchive-admin-view/thirdwardarchive-admin-view.component';
import { TWAHeaderComponent } from './components/twa-header/twa-header.component';
import { ThirdwardarchiveAdminProductsDetailsComponent } from './pages/projects/thirdwardarchive-admin-products-details/thirdwardarchive-admin-products-details.component';
import { TwaBackArrowComponent } from './components/twa-back-arrow/twa-back-arrow.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DocsCbbComponent,
    DocsMlbComponent,
    DocsNbaComponent,
    DocsPageComponent,
    DocsPgaComponent,
    DocsSoccerComponent,
    ContactComponent,
    ProjectPageComponent,
    SudokuComponent,
    TypingComponent,
    CollisionResolutionComponent,
    SpaceInvadersComponent,
    ConnectionsComponent,
    CreateConnectionsComponent,
    CatalogedComponent,
    LandingPageComponent,
    ResultsPageComponent,
    LiftwareHeaderComponent,
    DataVizComponent,
    ThirdwardarchiveComponent,
    ThirdwardarchiveCheckoutComponent,
    ThirdwardarchiveMerchComponent,
    ThirdwardarchiveMerchDetailComponent,
    ThirdwardarchiveLoginComponent,
    ThirdwardarchiveAddProductComponent,
    ThirdwardarchiveAdminViewComponent,
    TWAHeaderComponent,
    ThirdwardarchiveAdminProductsDetailsComponent,
    TwaBackArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
