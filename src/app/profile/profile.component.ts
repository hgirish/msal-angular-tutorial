import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const GRAPH_ENDPOINT = 'Enter_the_Graph_Endpoint_Here/v1.0/me';

type ProfileType = {
  givenName?:string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
profile?: ProfileType;

constructor(private http: HttpClient){}

ngOnInit(){
  this.getProfile();
}

getProfile(){
  this.http.get(GRAPH_ENDPOINT)
  .subscribe(profile => {
    this.profile  = profile;
  });
}
}
