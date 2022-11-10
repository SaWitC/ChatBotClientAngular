import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {

  constructor(private toastr: ToastrService) { }


  //HandleWithUseToastr(deffaultMessage: string) {

  //}
}
