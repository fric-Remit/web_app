import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `<div data-slot="card-header" [ngClass]="computedClass" ><ng-content></ng-content></div>`
})
export class CardHeaderComponent {
  @Input() className = '';
  get computedClass() {
    return cn('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', this.className);
  }
}