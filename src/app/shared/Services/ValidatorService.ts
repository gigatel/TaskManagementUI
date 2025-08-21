import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ValidatorService {

    constructor() { }

    public regex = {
        email: '^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[a-z]{2,5}$',
        emailId: '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
        emailMobileNumber: '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$',
        mobileNumber: '^[6-9][0-9]{9}$',
        mobile: '^[6-9]\d{9}$',
        name:'^[A-Za-z][A-Za-z0-9_& _]{1,50}$',
        number:'^[0-9]{1,10}$',
        acc_number:'^[0-9]{1,18}$',
        no_Decimal:'^[0-9]+(\\.[0-9]{1,2})?$',
        numberDecimalWithFiveDecimal: '^[0-9]+(\\.[0-9]{1,5})?$',
        panNo:'^[A-Za-z]{5}[0-9]{4}[A-Za-z]$',
        gstNo:'^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',
        faxno:'^\\+[0-9]{1,3}-[0-9]{3}-[0-9]{7}$',
        website:'(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})',
        websiteUrl: '(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
        alphaNumeric: '^[a-zA-Z0-9 _]*$',
        cIN:'^[A-Za-z][A-Za-z0-9_& _]{1,50}$',
        alphabets:'^[a-zA-Z ]*$',
        pinCode:'^[1-9][0-9]{5}$',
        password:'^(?=^.{8,}$)(?=.*[!@#$&*]).*$',
        accountNumber:'[0-9]{9,18}',
        amount: '^[+-]?[0-9]{1,14}(?:\.[0-9]{1,2})?$',
        amountDecimal:'^[0-9]+(\.[0-9]{1,2})?$',
        code: '^[a-zA-Z0-9]{10}$',
        ifscCode: '^[a-zA-Z0-9]{12}$',
        aadharNumber: '^[0-9]{12}$|^[0-9]{16}$',
        numberWithTwoDecimal: '^[0-9]{0,2}(\.[0-9]{1,2})?$',
        filePassport: '^.+\.(([jJ][pP][gG])|([jJ][pP][eE][gG])|([pP][nN][gG]))$',
        filePancard: '^.+\.(([jJ][pP][gG])|([jJ][pP][eE][gG])|([pP][nN][gG]))$',
        documentFile: '^.+\.(([pP][dD][fF])|([jJ][pP][gG])|([jJ][pP][eE][gG])|([pP][nN][gG]))$'
    }

    public markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control:any) => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach((c:any) => this.markFormGroupTouched(c));
            }
        });
    }

    getValidationErrors(group: FormGroup, validationMessages: any, checkDirty?: boolean): any {
        var formErrors:any = {};

        Object.keys(group.controls).forEach((key: string) => {
            formErrors[key] = '';
            const abstractControl = group.get(key);

            if (abstractControl && !abstractControl.valid) {
                const messages = validationMessages[key];
                if (!checkDirty || (abstractControl.dirty || abstractControl.touched)) {

                    for (const errorKey in abstractControl.errors) {
                        if (errorKey) {
                            if (messages)    
                                formErrors[key] += messages[errorKey] + ' ';
                            //formErrors[key] = messages[errorKey] + ' ';
                        }
                    }
                }
            }
            if (abstractControl instanceof FormGroup) {
                let groupError = this.getValidationErrors(abstractControl, validationMessages);
                formErrors = { ...formErrors, ...groupError }
            }
        });
        return formErrors
    }
getValidationErrorsForSingle(group: FormGroup, validationMessages: any, checkDirty?: boolean , Ids?:any ): any {
    var formErrors:any = {};
      for(let i=0 ; Ids.length>i; i++){
      formErrors[Ids[i]] = '';
        const abstractControl = group.get(Ids[i]);

        if (abstractControl && !abstractControl.valid) {
            const messages = validationMessages[Ids[i]];
            if (!checkDirty || (abstractControl.dirty || abstractControl.touched)) {

                for (const errorKey in abstractControl.errors) {
                    if (errorKey) {
                        formErrors[Ids[i]] += messages[errorKey] + ' ';
                    }
                }
            }
        }
      
        if (abstractControl instanceof FormGroup) {
            let groupError = this.getValidationErrorsForSingle(abstractControl, validationMessages);
            formErrors = { ...formErrors, ...groupError }
        }
    }
    
    return formErrors
}
    getValidationErrorsWithForm(group: FormGroup, validationMessages: any, checkDirty?: boolean): any {
        var formErrors:any = {};
        let v = this;
        if (group != undefined) {
            Object.keys(group.controls).forEach((key: any) => {
                formErrors[key] = '';
                const abstractControl: any = group.get(key);
                if (abstractControl.constructor.name == 'FormArray') {
                    formErrors[key] = [];
                    abstractControl.controls.forEach((formGroup:any, i:any) => {
                        let g = <any>formGroup;
                        let _group = <FormGroup>g;
                        if (validationMessages[key] != undefined) {
                            let error = v.getValidationErrorsWithForm(_group, validationMessages[key][i])
                            formErrors[key].push(error);
                        }
                    });
                } else if (abstractControl.constructor.name == 'FormGroup') {
                    let g = <any>abstractControl;
                    let _group = <FormGroup>g;
                    if(validationMessages[key]!=undefined){
                    formErrors[key] = v.getValidationErrorsWithForm(_group, validationMessages[key])
                    }
                } else if (abstractControl && !abstractControl.valid) {
                    const messages = validationMessages[key];
                    if (messages!=undefined && !checkDirty || (abstractControl.dirty || abstractControl.touched)) {

                        for (const errorKey in abstractControl.errors) {
                            if (errorKey) {
                                formErrors[key] = messages[errorKey] + ' ';
                            }
                        }
                    }
                }
                if (abstractControl instanceof FormGroup) {
                    let groupError = this.getValidationErrorsWithForm(abstractControl, validationMessages);
                    formErrors = { ...formErrors, ...groupError }
                }
            });
        }
        return formErrors
    }
    cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != "") {
            if ((control.value || '').trim().length === 0) {
                return { cannotContainSpace: true }
            }
        }
        return null;
    }

    emailValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != "") {
            const regularExp = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!regularExp.test(control.value)) {
                return { emailValidator: true };
            }
        }
        return null;
    }

}