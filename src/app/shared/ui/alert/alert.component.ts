import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() variant: 'default' | 'destructive' = 'default';

  get alertClasses(): string {
    const base = 'relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[0_1fr] gap-y-0.5 items-start';
    if (this.variant === 'destructive') {
      return base + ' text-destructive bg-card border-destructive';
    }
    return base + ' bg-card text-card-foreground';
  }
}
