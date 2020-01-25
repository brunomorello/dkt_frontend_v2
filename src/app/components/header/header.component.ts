import { Component, Input } from "@angular/core";

@Component({
    selector: 'dkt-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent {

    @Input()displayMenuItens = false;

    refresh() {
        location.reload();
    }

}