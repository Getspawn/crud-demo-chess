import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: []
})
export class DataTableComponent implements OnInit {

  @Input() columns: ColumnTable[] = [];
  @Input() actions: ActionTable[] = [];
  @Input() data: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface ColumnTable {
  title: string;
  dataProperty: string;
  transform?: (item: any) => string;
}

export interface ActionTable {
  name: string;
  click?: (item: any) => void;
  logoClass: string;
  tooltip: string;
}
