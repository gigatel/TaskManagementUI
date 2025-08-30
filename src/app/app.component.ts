import { Component, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (environment.production) {
      console.log("✅ Running in PRODUCTION build");
    } else {
      console.log("🛠️ Running in DEVELOPMENT build");
    }

    console.log('Is Dev Mode:', isDevMode());
  }
}

