// look at https://github.com/emonney/QuickApp/blob/master/src/QuickApp/ClientApp/app/directives/equal-validator.directive.ts
// https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
// http://plnkr.co/edit/KgjSTj7VqbWMnRdYZdxM?p=preview
import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[appValidateEqual][formControlName],[appValidateEqual][formControl],[appValidateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor(
      @Attribute('appValidateEqual') public validateEqual: string,
      @Attribute('reverse') public reverse: string) {

}

    private get isReverse() {
        if (!this.reverse) {
            return false;
        }
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const v = c.value;

        // control vlaue
        const e = c.root.get(this.validateEqual);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
          return {
            validateEqual: false
          };
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors.validateEqual;

            if (!Object.keys(e.errors).length) {
                e.setErrors(null);
            }
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({
                validateEqual: false
            });
        }

        return null;
    }
}
