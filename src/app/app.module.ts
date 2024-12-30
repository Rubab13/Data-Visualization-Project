import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Papa } from 'ngx-papaparse';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Countplot1Component } from './charts/countplot1/countplot1.component';
import { HeaderComponent } from './header/header.component';
import { DataComponent } from './data/data.component';
import { VisualsComponent } from './visuals/visuals.component';
import { PaygradeChartComponent } from './charts/paygrade-chart/paygrade-chart.component';
import { ContactLevelPieChartComponent } from './charts/contact-level-pie-chart/contact-level-pie-chart.component';
import { SummaryComponent } from './charts/summary/summary.component';
import { BoxplotComponent } from './charts/boxplot/boxplot.component';
import { Scatter1Component } from './charts/scatter1/scatter1.component';
import { CorrelationComponent } from './correlation/correlation.component';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { Bar1Component } from './bar1/bar1.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'overview', component: DataOverviewComponent},
  { path: 'visuals', component: VisualsComponent },
  { path: 'summary', component: SummaryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    HomeComponent,
    Countplot1Component,
    HeaderComponent,
    DataComponent,
    VisualsComponent,
    PaygradeChartComponent,
    ContactLevelPieChartComponent,
    SummaryComponent,
    BoxplotComponent,
    Scatter1Component,
    CorrelationComponent,
    DataOverviewComponent,
    HeatmapComponent,
    Bar1Component,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
