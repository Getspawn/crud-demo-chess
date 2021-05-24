import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertType } from 'src/app/shared/utils/enums';
import { PasswordValidator } from 'src/app/shared/utils/password-validator';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: []
})
export class UserDetailsComponent implements OnInit {

  public user: User;
  // Alert
  public AlertType = AlertType;
  public messageAlert: string = '';
  public showAlert: boolean = false;
  public alertType = AlertType.DANGER;

  // Password
  public passValidator: PasswordValidator = new PasswordValidator();
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;

  public title: string = '';
  public avatar: string = '';
  public form = this.formBuilder.group({
    user: ['', Validators.required],
    active: ['', Validators.required],
    password: ['', [Validators.required, this.passwordValidator()]],
    confirmPassword: ['', [Validators.required, this.checkPasswordMatch()]],
    name: [''],
    surname: [''],
    email: ['', Validators.required],
    address: [''],
    phone: [''],
    avatar: ['']
  });

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.initializeUser();
  }

  reset(): void {
    this.form.reset({
      user: this.user.usuario,
      active: this.user.activo,
      password: this.user.clave,
      name: this.user.nombre,
      surname: this.user.apellido,
      email: this.user.email,
      address: this.user.direccion,
      phone: this.user.telefono,
      avatar: this.user.imagen64
    });
  }

  createUser(): void {

    if (this.form.invalid) {
      this.setAlert(AlertType.DANGER, true, 'Por favor, verifique los campos obligatorios');
      return;
    }

    if (!this.passValidator.passwordMatch) {
      this.setAlert(AlertType.DANGER, true, 'Las contraseñas no coinciden');
      return;
    }

    this.setAlert(0, false, '');

    this.user.nrousu = 102;
    this.user.usuario = this.form.value.user;
    this.user.activo = this.form.value.active;
    this.user.clave = this.form.value.password;
    this.user.nombre = this.form.value.name;
    this.user.apellido = this.form.value.surname;
    this.user.email = this.form.value.email;
    this.user.direccion = this.form.value.address;
    this.user.telefono = this.form.value.phone;
    this.user.imagen64 = this.avatar;

    this.apiService.createUser(this.user).subscribe(resp => {
      this.setAlert(AlertType.SUCCESS, true, 'Usuario creado correctamente');
    }, error => {
      this.setAlert(AlertType.DANGER, true, 'Error al crear el usuario');
    });
  }

  initializeUser(): void {
    this.user = JSON.parse(localStorage.getItem('user')) ?? new User(0);

    if (this.user.nrousu > 0) {
      this.title = 'Editar Usuario'
    }
    else {
      this.title = 'Crear Usuario'
    }

    this.reset();
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.avatar = reader.result as string;

      };
    }
  }

  checkPasswordMatch() {
    return this.passValidator.checkPasswordMatch;
  }

  passwordValidator() {
    return this.passValidator.validate;
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType(): void {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  setAlert(alertType: number, showAlert: boolean, messageAlert: string): void {
    this.showAlert = showAlert;
    this.alertType = alertType;
    this.messageAlert = messageAlert;
  }
}
