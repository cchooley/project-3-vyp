import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { SeussicalComponent } from './components/seussical/seussical.component'
import { AboutComponent } from './components/about/about.component'
import { EnrollComponent } from './components/enroll/enroll.component'
import { EnrollmentComponent } from './components/enrollment/enrollment.component'
import { ScholarshipComponent } from './components/scholarship/scholarship.component'

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'seussical', component: SeussicalComponent },
    { path: 'about', component: AboutComponent },
    { path: 'enroll', component: EnrollComponent },
    { path: 'scholarship', component: ScholarshipComponent },
    { path: 'admin', component: EnrollmentComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }