import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css'],
})
export class OrderServiceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToOrderCreate(): void {
    this.router.navigate(['/orders/create']);
  }
}
