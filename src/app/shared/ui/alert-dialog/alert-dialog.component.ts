import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  close() {
    this.open = false;
    this.openChange.emit(this.open);
  }

  openDialog() {
    this.open = true;
    this.openChange.emit(this.open);
  }
}
