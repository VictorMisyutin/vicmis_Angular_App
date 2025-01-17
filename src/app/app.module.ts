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
import { MusicRankingsComponent } from './pages/projects/music-rankings/music-rankings.component';
import { BlogHomeComponent } from './pages/blog/blog-home/blog-home.component';
import { MultiplaterGameComponent } from './pages/projects/multiplater-game/multiplater-game.component';
import { AnIntroductionToVimComponent } from './pages/blog/posts/an-introduction-to-vim/an-introduction-to-vim.component';
import { MyExperienceWithLinuxAndWindowsComponent } from './pages/blog/posts/my-experience-with-linux-and-windows/my-experience-with-linux-and-windows.component';
import { RetroUiComponent } from './components/informal/retro-ui/retro-ui.component';
import { NeuralNetworksComponent } from './pages/blog/posts/neural-networks/neural-networks.component';
import { CS409Component } from './pages/projects/cs-409/cs-409.component';
import { Cs409RedirectionPageComponent } from './pages/projects/cs-409-redirection-page/cs-409-redirection-page.component';
import { DynastyLandingPageComponent } from './pages/projects/shirt-dynasty/dynasty-landing-page/dynasty-landing-page.component';
import { MovieGeneratorComponent } from './pages/projects/movie-generator/movie-generator.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
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
    MusicRankingsComponent,
    BlogHomeComponent,
    MultiplaterGameComponent,
    AnIntroductionToVimComponent,
    MyExperienceWithLinuxAndWindowsComponent,
    RetroUiComponent,
    NeuralNetworksComponent,
    CS409Component,
    Cs409RedirectionPageComponent,
    DynastyLandingPageComponent,
    MovieGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
      // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
