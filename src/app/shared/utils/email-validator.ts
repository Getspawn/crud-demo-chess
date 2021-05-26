import { AbstractControl } from "@angular/forms";

export class MailValidator {

    public emptyField = true;
    public validEmail = false;

    public validate = (control: AbstractControl) => {
        const email = control.value;

        if (email) {
            this.emptyField = false;
        }
        else {
            this.emptyField = true;
        }

        var exp = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;

        if (!exp.test(email) || !email.trim()) {
            this.validEmail = false;
        }
        else {
            this.validEmail = true;
        }

        return this.validEmail;
    };
}