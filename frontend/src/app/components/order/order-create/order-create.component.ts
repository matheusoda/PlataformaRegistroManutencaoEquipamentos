import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Order } from '../order.model';
import { TypeItem } from '../type.model';
import { statusItem } from '../status.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  formulario!: FormGroup;
  types!: TypeItem[];
  status!: statusItem[];
  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  order: Order = {
    type: null,
    dateInit: new Date(),
    dateFin: null,
    datePre: null,
    description: '',
    status: 'Em andamento',
  };

  ngOnInit(): void {
    this.orderService.readTypes().subscribe((types) => {
      this.types = types;
    });

    this.orderService.readStatus().subscribe((status) => {
      this.status = status;
    });

    this.formulario = this.formBuilder.group({
      type: ['', [Validators.required]],
      dateInit: ['', [Validators.required]],
      datePre: ['', [Validators.required]],
      description: ['', [Validators.required], Validators.minLength(15)],
    });
  }

  createOrder(): void {
    this.orderService.create(this.order).subscribe(() => {
      this.orderService.showMessage('Ordem de serviço criada com sucesso');
      this.router.navigate(['/orders']);
    });
  }

  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
