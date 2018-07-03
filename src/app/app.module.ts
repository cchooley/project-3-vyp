import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing-module'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { FusionChartsModule } from 'angular2-fusioncharts'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { AboutComponent } from './components/about/about.component'
import { SeussicalComponent } from './components/seussical/seussical.component'
import { EnrollComponent } from './components/enroll/enroll.component'
import { ScholarshipComponent } from './components/scholarship/scholarship.component'
import { FooterComponent } from './components/footer/footer.component'
import { EnrollmentComponent } from './components/enrollment/enrollment.component'

import { HttpService } from './services/http.service'

import * as FusionCharts from 'fusioncharts'
import * as Charts from 'fusioncharts/fusioncharts.charts'
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint'

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    SeussicalComponent,
    EnrollComponent,
    ScholarshipComponent,
    FooterComponent,
    EnrollmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FusionChartsModule
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
