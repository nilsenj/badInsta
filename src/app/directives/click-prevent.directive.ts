import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickPrevent]'
})
export class ClickPreventDirective {

  constructor() { }
    @HostListener("click", ["$event"])
    public onClick(event: any): boolean
    {
        return false;
    }
}
