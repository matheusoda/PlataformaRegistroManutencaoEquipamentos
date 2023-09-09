import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-finalize',
  templateUrl: './modal-finalize.component.html',
  styleUrls: ['./modal-finalize.component.css'],
})
export class ModalFinalizeComponent implements OnInit {
  formulario!: FormGroup;
  order: Order = {
    type: null,
    dateInit: new Date(),
    dateFin: null,
    datePre: null,
    description: '',
    status: '',
    maintenanceDescription: '',
  };

  displayedColumns = [
    'id',
    'type',
    'dateInit',
    'datePre',
    'description',
    'maintenanceDescription',
    'status',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<ModalFinalizeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      type: string;
    }
  ) {}

  ngOnInit(): void {
    this.orderService.readById(this.data.id).subscribe((order) => {
      this.order = order;
    });

    this.formulario = this.formBuilder.group({
      dateFin: [null, [Validators.required]],
      maintenanceDescription: [
        null,
        [Validators.required, Validators.minLength(15)],
      ],
    });
  }

  onConfirm(order: Order, result: Boolean): void {
    this.dialogRef.close({ order, result });
  }
}
