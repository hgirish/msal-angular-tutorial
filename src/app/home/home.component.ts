import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loginDisplay = false;

constructor(private authService: MsalService,
  private msalBroadcastService:  MsalBroadcastService
){}

ngOnInit(): void {
  this.msalBroadcastService.msalSubject$
  .pipe(
    filter((msg: EventMessage) => msg.eventType == EventType.LOGIN_SUCCESS),
  )
  .subscribe((result: EventMessage) => {
    console.log(result);
  });

  this.msalBroadcastService.inProgress$
  .pipe(
    filter((status: InteractionStatus) => status === InteractionStatus.None)
  )
  .subscribe(()=> {
    this.setLoginDisplay()
  })
}

setLoginDisplay() {
  this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
}
}
