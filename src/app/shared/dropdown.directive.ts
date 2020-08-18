import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  // Only add class by clicking the element
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen() {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

}
