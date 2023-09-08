import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-modal-finalize',
  templateUrl: './modal-finalize.component.html',
  styleUrls: ['./modal-finalize.component.css'],
})
export class ModalFinalizeComponent implements OnInit {
  order!: Order;
  displayedColumns = [
    'id',
    'type',
    'dateInit',
    'datePre',
    'description',
    'status',
  ];

  constructor(
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
      console.log(this.order);
    });
  }

  onConfirm(order: Order, result: Boolean): void {
    this.dialogRef.close({ order, result });
  }
}
