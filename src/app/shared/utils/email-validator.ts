import { AbstractControl } from "@angular/forms";

export class PasswordValidator {

    public emptyField = true;

    public validate = (control: AbstractControl) => {
        const email = control.value;

        if (email) {
            this.emptyField = false;
        }
        else {
            this.emptyField = true;
        }

        var exp = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;

        return (!exp.test(email) || !email.trim());
    };
}