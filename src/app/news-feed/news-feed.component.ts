import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { OktaAuth } from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthNoticeComponent } from 'app/auth-notice/auth-notice.component';
import { GnewsGetService } from 'app/shared/gnews/gnews-get.service';
import { GnewsConfigService } from 'app/shared/gnews/gnews-config.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsFeedComponent implements OnInit {
  strThisSession;
  strUserSession: Boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  durationInSeconds = 5;
  arrNewsArticles = [];

  constructor(public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public _snackBar: MatSnackBar,
    public GnewsGetService: GnewsGetService,
    public GnewsConfigService: GnewsConfigService,
public CookieService:CookieService,
  ) { }

  NotAuthed() {
    this._snackBar.openFromComponent(AuthNoticeComponent,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',

      });
  }

  async ShowArticles() {
    this.arrNewsArticles = [];
    await this.GnewsGetService.GetNews();
    const myData = this.GnewsGetService.arrGNews
    
    

    //const myData = JSON.parse(localStorage.getItem('headlines'));
    for (var i = 0; i < myData.articles.length; i++) {
      this.arrNewsArticles[i] = myData.articles[i];
    }
    console.log(this.arrNewsArticles);
    console.log(Array.isArray(this.arrNewsArticles));
  }

  async ngOnInit() {
    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        // alert('ログインしてください')
        await this.NotAuthed();
        window.location.replace('/');
      case true:
        this.OktaGetTokenService.GetAccessToken();
        this.ShowArticles();
        break;

    }

  }

}
