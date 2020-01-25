import { Component } from "@angular/core";

@Component({
    selector: 'dkt-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent {

    displayMenuItens = false;

    hideMenuItens() {
        this.displayMenuItens = !this.displayMenuItens;
    }

}