import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CsvService} from "../csv/csv.service";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {
  zone: number;
  shipping_cost: number;
  total: number;
  zones_pricing: any = JSON.parse(localStorage.getItem('zoneMap') || '{}');
  is_submitted = false;

  constructor(private csvService: CsvService) {}

  shippingForm = new FormGroup({
    postcode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}$/)
    ]),
    totalOrderAmount: new FormControl('', [
      Validators.required
    ]),
    isLongProd: new FormControl(false)
  })

  onSubmit() {
    this.is_submitted = true;
    this.zone = +this.shippingForm.value['postcode'].substring(0,2);
    this.total = +this.shippingForm.value['totalOrderAmount'];
    this.getShippingCost();
    if (this.total > 12500) {
      this.shipping_cost = this.shipping_cost * 0.95;
    }
    if (this.shippingForm.value['isLongProd']) {
      this.shipping_cost += 1995;
    }

    this.shippingForm.reset();
  }

  onZonesImport(event: any) {
    const file: File = event.target.files[0];

    this.csvService.parseCsv(file).subscribe(
      (data: any) => {
        console.log(data);
        this.zones_pricing = data;
      }
    );
  }

  getShippingCost() {
    this.shipping_cost = this.zones_pricing[this.zone];
  }
}
