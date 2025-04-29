import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSvgIcon]',
  standalone: true
})
export class SvgIconDirective {
  @Input('appSvgIcon') iconName: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setIcon(this.iconName);
  }

  setIcon(iconName: string) {
    let svgMarkup = '';

    switch (iconName) {
      case 'deadline':
        svgMarkup = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle fill="#00ACC1" cx="17" cy="17" r="14"></circle><circle fill="#eee" cx="17" cy="17" r="11"></circle><rect x="16" y="8" width="2" height="9"></rect><rect x="18.2" y="16" transform="matrix(-.707 .707 -.707 -.707 46.834 19.399)" width="2.4" height="6.8"></rect><circle cx="17" cy="17" r="2"></circle><circle fill="#00ACC1" cx="17" cy="17" r="1"></circle><path fill="#FFC107" d="M11.9,42l14.4-24.1c0.8-1.3,2.7-1.3,3.4,0L44.1,42c0.8,1.3-0.2,3-1.7,3H13.6C12.1,45,11.1,43.3,11.9,42z"></path><path fill="#263238" d="M26.4,39.9c0-0.2,0-0.4,0.1-0.6s0.2-0.3,0.3-0.5s0.3-0.2,0.5-0.3s0.4-0.1,0.6-0.1s0.5,0,0.7,0.1 s0.4,0.2,0.5,0.3s0.2,0.3,0.3,0.5s0.1,0.4,0.1,0.6s0,0.4-0.1,0.6s-0.2,0.3-0.3,0.5s-0.3,0.2-0.5,0.3s-0.4,0.1-0.7,0.1 s-0.5,0-0.6-0.1s-0.4-0.2-0.5-0.3s-0.2-0.3-0.3-0.5S26.4,40.1,26.4,39.9z M29.2,36.8h-2.3L26.5,27h3L29.2,36.8z"></path></svg>`;
      break;

      case 'meeting':
        svgMarkup = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFA726" cx="12" cy="21" r="5"></circle><g fill="#455A64"><path d="M2,34.7c0,0,2.8-6.3,10-6.3s10,6.3,10,6.3V38H2V34.7z"></path><path d="M46,34.7c0,0-2.8-6.3-10-6.3s-10,6.3-10,6.3V38h20V34.7z"></path></g><circle fill="#FFB74D" cx="24" cy="17" r="6"></circle><path fill="#607D8B" d="M36,34.1c0,0-3.3-7.5-12-7.5s-12,7.5-12,7.5V38h24V34.1z"></path><circle fill="#FFA726" cx="36" cy="21" r="5"></circle><circle fill="#FFA726" cx="12" cy="21" r="5"></circle><circle fill="#FFA726" cx="36" cy="21" r="5"></circle></svg>`;
    }
      // Insert the SVG as innerHTML
      this.el.nativeElement.innerHTML = svgMarkup;
  }
}
