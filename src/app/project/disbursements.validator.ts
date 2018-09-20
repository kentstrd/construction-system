import { FormGroup } from '@angular/forms';

export function ValidateDisbursements(group: FormGroup) {

let disbursementArray = []
let totalCost = group.get('totalCost').value.replace(/[^0-9.]/g,'')
let disbursements = group.get('disbursement').value

    disbursements.forEach(disbursement => {
        disbursementArray.push(+disbursement.cost.replace(/[^0-9.]/g,''))
    });

    if(totalCost < disbursementArray.reduce((a, b) => a + b, 0)){
         return { validDisburesment: true}
    }

    return null;

}