import { AbstractControl } from "@angular/forms";

export class PasswordValidator {

  public passwordMatch = false;
  public emptyField = true;

  private password: string;

  public validate = (control: AbstractControl) => {
    this.password = control.value;
    
    return;
  };

  public checkPasswordMatch = (control: AbstractControl) => {
    if (!control.value) {
      this.passwordMatch = false;
      this.emptyField = true;
      return false;
    }
    else {
      const password = this.password;
      this.emptyField = false;
      if (control.value === password) {
        this.passwordMatch = true;
      }
      else {
        this.passwordMatch = false;
      }
    }

    return this.passwordMatch;
  };
}