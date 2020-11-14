import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {
    closeResult = '';
    isMenuCollapsed: boolean;
    optionsBoxOpen = false;
    pageName = 'propertyListings';
    userIsLoggedIn = false;

    constructor(private router: Router) {

    }
}
