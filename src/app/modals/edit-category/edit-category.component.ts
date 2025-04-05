import { Component, Input } from '@angular/core';
import { ModalController, IonicModule  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditCategoryComponent {
  @Input() category: any;
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.category) {
      this.form.patchValue({
        name: this.category.name,
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    if (this.form.valid) {
      const updatedCategory = {
        ...this.category,
        name: this.form.value.name,
      };
      this.modalController.dismiss({ updatedCategory });
    }
  }
}
