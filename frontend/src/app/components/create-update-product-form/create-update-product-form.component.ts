import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-create-update-product-form',
  templateUrl: './create-update-product-form.component.html',
  styleUrls: ['./create-update-product-form.component.css']
})
export class CreateUpdateProductFormComponent implements OnChanges {
  @Input() product: Product | undefined;
  @Input() isLoading: boolean = false;
  @Output() submitted = new EventEmitter<Product>();

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue) {
      this.form?.patchValue(this.product!!);
    }
  }

  form = this.fb.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    price: [0, Validators.compose([Validators.required, Validators.min(0)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(30)])],
    brand: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    material: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    color: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    bannerImage: ['', Validators.compose([Validators.required, Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm)])],
  });


  onSubmit() {
    this.submitted.emit(this.form.value as Product);
  }
}
