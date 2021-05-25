import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ActionTable, ColumnTable } from 'src/app/shared/data-table/data-table.component';
import { AlertType } from 'src/app/shared/utils/enums';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  public users: User[] = [];
  public columns: ColumnTable[] = [];
  public actions: ActionTable[] = [];
  // Alert
  public AlertType = AlertType;
  public messageAlert: string = '';
  public showAlert: boolean = false;
  public alertType = AlertType.DANGER;

  constructor(private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.spinner.show();
    this.clearLocalStorage();
    this.tableInit();
    this.dataInit();
  }

  tableInit = (): void => {
    this.columns = [
      { title: 'Id', dataProperty: 'nrousu' },
      { title: "Usuario", dataProperty: 'usuario' },
      { title: "Activo", dataProperty: 'activo', transform: item => item ? 'Si' : 'No' },
    ];

    this.actions = [
      {
        name: 'Edit',
        click: user => { this.editUser(user) },
        logoClass: 'fa fa-pencil icon fa-lg'
      },
      {
        name: 'Delete',
        click: user => { this.deleteUser(user) },
        logoClass: 'fa fa-trash icon fa-lg'
      },
    ];
  }

  dataInit(): void {
    this.showAlert = false;
    this.apiService.getUsers().subscribe(resp => {
      this.users = resp.response.dsUsuariosDemo.ttusuarios;
      this.spinner.hide();
    }, error => {
      this.setAlert(AlertType.DANGER, true, 'Ocurrió un error al obtener los usuarios');
      this.spinner.hide();
    });
  }

  editUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));

    this.router.navigateByUrl(`/edit`);
  }

  deleteUser(user: User): void {

    this.setAlert(0, false, '');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: 'Confirmación',
      body: '¿Está seguro que desea eliminar el usuario?'
    };

    const modalDialog = this.matDialog.open(ConfirmDialogComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(resp => {
      if (resp.event === 'confirm') {
        this.spinner.show();
        this.apiService.deleteUser(user).subscribe(resp => {
          this.dataInit();
          this.setAlert(AlertType.SUCCESS, true, 'Usuario eliminado correctamente');
        }, error => {
          this.setAlert(AlertType.DANGER, true, 'Ocurrió un error al eliminar el usuario');
          this.spinner.hide();
        });
      }
    });
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  setAlert(alertType: number, showAlert: boolean, messageAlert: string): void {
    this.showAlert = showAlert;
    this.alertType = alertType;
    this.messageAlert = messageAlert;
  }
}
