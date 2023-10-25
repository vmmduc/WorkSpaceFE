import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastCustom {
  constructor(private toast: ToastrService) {}

  show(title?: string, message?: string, type?: string) {
    this.toast.error(message, title, {
      timeOut: 1000,
      positionClass: 'toast-top-center',
    });
  }
}
