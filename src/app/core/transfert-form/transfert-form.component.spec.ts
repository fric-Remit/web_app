import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertFormComponent } from './transfert-form.component';

describe('TransfertFormComponent', () => {
  let component: TransfertFormComponent;
  let fixture: ComponentFixture<TransfertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfertFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
