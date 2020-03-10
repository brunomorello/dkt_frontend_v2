import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'dkt-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent {

    constructor(private router: Router) {}

    @Input()displayMenuItens = false;

    goToHome() {
        this.router.navigate(['/']);
      }

}