import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  showMenu: boolean = false;

  public constructor(private router: Router, private titleService: Title, private authService: AuthService){

  }

  ngOnInit() {
    this.authService.showMenuEmitter.subscribe(show => this.showMenu = show);

    this.router.events.pipe(
       filter((event) => event instanceof NavigationEnd)).pipe(
       map(() => this.router))
      .subscribe((event) => {
          const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' | ');
          this.titleService.setTitle(title);
        }
      );
  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }  

}
