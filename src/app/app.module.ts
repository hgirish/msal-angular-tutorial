import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";


import { MsalGuard, MsalModule, MsalRedirectComponent } from "@azure/msal-angular";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from '../environments/environment';

const isIE = 
window.navigator.userAgent.indexOf("MSIE") > -1 ||
window.navigator.userAgent.indexOf("Trident") > -1;

@NgModule({
    declarations: [AppComponent, HomeComponent, ProfileComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MatButtonModule,
      MatToolbarModule,
      MatListModule,
      MsalModule.forRoot(
        new PublicClientApplication({
          auth: {
            clientId: `${environment.Application_client_ID}`, // Application (client) ID from the app registration
            authority:
              `https://login.microsoftonline.com/${environment.Directory_Tenant_ID}`, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
            redirectUri: `${environment.Redirect_Uri}`, // This is your redirect URI
          },
          cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
          },
        }),
        {
            interactionType: InteractionType.Redirect, // MSAL Guard Configuration
            authRequest: {
                scopes: ["user.read"]
            }
        },
        null
      ),
    ],
    providers: [
        MsalGuard, // MsalGuard added as provider here

    ],
    bootstrap: [AppComponent, MsalRedirectComponent],
  })
  export class AppModule {}