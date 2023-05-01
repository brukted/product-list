import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProductFormComponent } from './create-update-product-form.component';

describe('CreateUpdateProductFormComponent', () => {
  let component: CreateUpdateProductFormComponent;
  let fixture: ComponentFixture<CreateUpdateProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
