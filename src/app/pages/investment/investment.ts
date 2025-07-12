import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-investment-popupd',
   imports: [CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './investment.html',
  styleUrl: './investment.css'
})
export class InvestmentPopupComponent {
    investmentForm: FormGroup;
  reviewMode = false;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<InvestmentPopupComponent>
  ) {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      purchasePrice: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required]
    });
  }

  onReview() {
    if (this.investmentForm.valid) {
      this.reviewMode = true;
    }
  }

  onSubmit() {
    console.log('Form Submitted:', this.investmentForm.value);
    alert('Investment Details Submitted!');
    this.investmentForm.reset();
    this.reviewMode = false;
  }

  onCancel() {
    this.investmentForm.reset();
    this.reviewMode = false;
    this.dialogRef.close();
  }
  edit(){
    this.reviewMode = false;
  }

}
