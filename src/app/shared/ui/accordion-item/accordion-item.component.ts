import { Component, Input, HostBinding } from '@angular/core';
import { AccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  host: {
    role: 'region',
  },
})
export class AccordionItemComponent {
  @Input() value!: string;

  constructor(private accordion: AccordionComponent) {}

  toggle() {
    this.accordion.toggleItem(this.value);
  }

  get isOpen(): boolean {
    return this.accordion.isOpen(this.value);
  }

  @HostBinding('class.open')
  get open() {
    return this.isOpen;
  }
}
