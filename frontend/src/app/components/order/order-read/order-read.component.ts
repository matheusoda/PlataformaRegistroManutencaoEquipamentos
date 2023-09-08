import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { TypeItem } from '../type.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalFinalizeComponent } from '../modal-finalize/modal-finalize.component';

@Component({
  selector: 'app-order-read',
  templateUrl: './order-read.component.html',
  styleUrls: ['./order-read.component.css'],
})
export class OrderReadComponent implements OnInit {
  order!: Order[];
  types!: TypeItem[];
  displayedColumns = [
    'id',
    'type',
    'dateInit',
    'datePre',
    'dateFin',
    'description',
    'status',
    'action',
  ];
  constructor(private orderService: OrderService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.orderService.read().subscribe((order) => {
      this.order = order;
    });

    this.orderService.readTypes().subscribe((types) => {
      this.types = types;
      this.validateData();
    });
  }
  validateData(): void {
    this.order.forEach((o) => {
      this.types.filter((t) => {
        if (t.id === o.type) o.typeName = t.name;
      });
    });
  }

  closeOrder(id: number, type: string): void {
    const dialogRef = this.dialog.open(ModalFinalizeComponent, {
      data: {
        id: id,
        type: type,
      },
      width: '40rem',
    });

    dialogRef.afterClosed().subscribe(({ order, result }) => {
      if (result) {
        order.status = 'Finalizado';
        this.orderService.update(order).subscribe(() => {
          this.orderService.showMessage('Ordem finalizada com sucesso');
          location.reload();
        });
      }
    });
  }
}
