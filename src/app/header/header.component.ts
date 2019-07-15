import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
  ngOnInit() {
    this.authService.isAuthenticatedUser.subscribe((data: boolean) => {
      this.isAuthenticated = data;
    });
  }
  
  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    }, error => {
      console.log(error)
    });
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
