import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() multiple = false;
  openItems = new Set<string>();

  toggleItem(value: string) {
    if (this.openItems.has(value)) {
      this.openItems.delete(value);
    } else {
      if (!this.multiple) {
        this.openItems.clear();
      }
      this.openItems.add(value);
    }
  }

  isOpen(value: string): boolean {
    return this.openItems.has(value);
  }
}