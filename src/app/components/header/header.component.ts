import { Component, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: 'dkt-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent {

    constructor(private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
         }
    
         this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
               // trick the Router into believing it's last link wasn't previously loaded
               this.router.navigated = false;
               // if you need to scroll back to top, here is the right place
               window.scrollTo(0, 0);
            }
        });
    }

    @Input()displayMenuItens = false;

    goToHome() {
        this.router.navigate(['/']);
    }

    goToPromoPage() {
        this.router.navigate(['/courseSearch'], { queryParams: { promo: 'ti' } });
    }

}