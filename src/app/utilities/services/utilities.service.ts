import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    public toastr: ToastrService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public router: Router
  ) {}

  generateRandomDigits() {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/[-:.TZ]/g, '');
    let day: any = timestamp.substr(6, 2);
    const hours: any = timestamp.substr(8, 2);
    const minutes: any = timestamp.substr(10, 2);
    const seconds: any = timestamp.substr(12, 2);
    const randomNum = Math.floor(Math.random() * 10000);
    const concatenatedValue = `${day}${hours}${minutes}${seconds}${randomNum
      .toString()
      .padStart(4, '0')}`;
    return concatenatedValue;
  }
}
