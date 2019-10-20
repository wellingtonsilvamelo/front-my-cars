import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  @Input() isLogged: Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("ACCESS_TOKEN")){
      this.isLogged = true;
    }
  }

  signOut(){
    this.authService.signOut();
    this.isLogged = false;
    this.router.navigateByUrl('/login');
  }

}
