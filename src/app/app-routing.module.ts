import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { BrowserUtils } from "@azure/msal-browser";
import { MsalGuard } from "@azure/msal-angular";

const routes: Routes = [
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [MsalGuard],
    },
    {
        path: "",
        component: HomeComponent,
    },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            // Don't perform initial navigation in iframes or popups
      initialNavigation:
      !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
        ? "enabledNonBlocking"
        : "disabled", // Set to enabledBlocking to use Angular Universal
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule{}