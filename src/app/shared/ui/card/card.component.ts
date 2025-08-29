import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `<div data-slot="card" [ngClass]="computedClass" ><ng-content></ng-content></div>`,
  styles: []
})
export class CardComponent {
  @Input() className = '';
  get computedClass() {
    return cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border', this.className);
  }
}