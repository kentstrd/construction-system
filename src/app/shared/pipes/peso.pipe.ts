import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({
  name: 'pesoPipe'
})
export class PesoPipe extends DecimalPipe implements PipeTransform { amount: any;

  transform(value: any, args?: any): any {

      let amount = String(value);
      amount = amount.replace(/[^0-9\s.]/g,'')
      if(amount != ''){
        amount = super.transform(amount)
        return `₱${amount}`
      }else{
          return amount
      }
  }

}
