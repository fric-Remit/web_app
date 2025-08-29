import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `<h4 data-slot="card-title" [ngClass]="computedClass"><ng-content></ng-content></h4>`
})
export class CardTitleComponent {
  @Input() className = '';
  get computedClass() {
    return cn('leading-none', this.className);
  }
}