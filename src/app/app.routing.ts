import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'news',           component: NewsFeedComponent},
  // { path: 'profilev2', component: Profilev2Component },
  // { path: 'store', component: SwagstoreComponent },
  // { path: 'checkout', component: CheckoutComponent },
  // { path: 'save', component: SaveModalComponent },
  //{ path: 'signup',           component: SignupComponent },
  //{ path: 'landing',          component: LandingComponent },
  // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
