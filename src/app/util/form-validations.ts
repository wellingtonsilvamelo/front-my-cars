import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório!`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength}!`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength}!`,
            'cepInvalido': 'CEP Inválido!',
            'invalidPhone': 'Invalid phone!',
            'emailInvalid': `${fieldName} já existe!`,
            'email': `Por favor, informe um ${fieldName} válido!`,
            'notEqualTo': `${fieldName} não correspondem!`,
            'requiredCheckMin': `Você precisa informar ao menos ${validatorValue.requiredLength} ${fieldName}!`,
            'invalidPlate': `Informe uma placa válida!`
        }
        return config[validatorName];
    }

    static requiredMinCheckBox(min: number) {
        const validator = (formArray: FormArray) => {
            let values = formArray.controls;
            let totalChecked = values.map(v => v.value)
                .reduce((total, current) => current ? total + 1 : total, 0);
            return totalChecked >= min ? null : { requiredCheckMin: { requiredLength: min, actualLength: totalChecked } };
        }
        return validator;
    }

    static cepValidator(formControl: FormControl) {
        const cep = formControl.value;
        if (cep && cep !== '') {
            const validaCEP = /^[0-9]{8}$/;
            return validaCEP.test(cep) ? null : { cepInvalido: true }
        }
        return null;
    }

    static phoneValidator(formControl: FormControl) {
        const phone = formControl.value;
        if (phone && phone !== '') {
            const validatePhone = /^[0-9]{10,11}$/;
            return validatePhone.test(phone) ? null : { invalidPhone: true }
        }
        return null;
    }

    static plateValidator(formControl: FormControl) {
        const plate = formControl.value;
        if (plate && plate !== '') {
            const validatePlate = /^[a-zA-Z]{3}[0-9]{4}$/;
            return validatePlate.test(plate) ? null : { invalidPlate: true }
        }
        return null;
    }

    static equalTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('You must inform a field.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('You must inform a field.');
            }

            if (field.value !== formControl.value) {
                return { notEqualTo: true }
            }

            return null;
        }
        return validator;
    }

}