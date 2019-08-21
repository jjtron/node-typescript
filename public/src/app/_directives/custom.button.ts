import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: "[custom-button]"
})
export class CustomButton {
    constructor() {

    }

    @HostListener('click') onClick() {
        alert("Don't touch my bacon!");
    }
    @HostBinding('style.cursor') cursorType = 'pointer';
}