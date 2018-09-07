import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';


@Pipe({
  name: 'pesoPipe'
})
export class PesoPipe extends DecimalPipe implements PipeTransform { amount: any;

  transform(value: any, args?: any): any {
    if(value != null ){
      value = +value.replace(/[^0-9\s.]/g,'')
      if( /^-?\d+\.?\d*$/.test(value) ){
        value = super.transform(value)
        // console.log(value)
        if(value == 0 && value == '₱'){
          return null
        }return `₱${value}`
      }
    }

}
}