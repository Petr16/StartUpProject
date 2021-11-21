import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { 
  DxDataGridModule, 
  DxButtonModule, 
  DxDataGridComponent,
  DxPopupModule,
  DxTemplateModule,
  DxPopoverModule,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { Requests } from '../shared/requests.model';
import { timeout } from 'rxjs';
//import {CustomHttpClient} from '../infrastructure/custom-http-client'
//import { createCustomStore } from '../utils/dxUtils.js';
//import {endPoints} from 'src/app/const/endPoints.js'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  newRequest: Requests = {id: 0,name:''};
  customDataSource: CustomStore;
  dataSource2: Requests[] = [];
  
  selectedItemKeys: any[] = [];
  deleteKeyRequest: number = 0;
  deleteKeysRequest: number[] = [];
  selectedRequest: Requests;
  editRequest: Requests = {id: 0, name: ''}
  
  popupVisible = false;//закрыт или открыт наш dialog для создания заявки
  requestPopup = 'Форма добавления заявки';
  popupEditVisible = false;//закрыт или открыт наш dialog для изменения заявки
  requestEditPopup = 'Форма изменения заявки №';
  requestEditPopupCustom = '';

  ADD_TO_FAVORITES = 'Add to Favorites';
  REMOVE_FROM_FAVORITES = 'Remove from Favorites';
  
  emailButtonOptions: any;
  closeButtonOptions: any;
  positionOf: string;
  txbxRequestName: string;
  txbxCustomerName: string;
  
  phoneRules: any = {
    X: /[02-9]/,
  };
  labelMode = 'static';
  stylingMode = 'filled';
  birthDate = new Date(1981, 5, 3);

  constructor(public service: RequestsService) { 
    /* (onInitialized)="saveGridInstance($event)" */
      function isNotEmpty(value: any) {
        return value !== undefined && value !== null && value !== '';
      }
      
      this.customDataSource = new CustomStore({
        key: 'id',

        async load(loadOptions: any) {
          let params = '?';
          [
            'skip',
            'take',
            'requireTotalCount',
            'requireGroupCount',
            'sort',
            'filter',
            'totalSummary',
            'group',
            'groupSummary',
          ].forEach(i => {
            if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
          });
          params = params.slice(0, -1);
          console.log(`!!!!!!!!!!!!${params}`);
          try {
            const response = await fetch('http://localhost:5000/api/requests');
            const data = await response.json();
            return ({
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            });
          } catch (e) {
            throw e;
          }
        },

        /* insert(value: any) {
            console.log(value);
        },
        update(key, values) {
            // ...
        },
        remove(key){
            // ...
        } */
      });
      console.log(this.dataGrid);
      console.log(this.customDataSource.key());


      //Для popup типа снекбара
      this.emailButtonOptions = {
        icon: 'email',
        text: 'Send',
        onClick(e: any) {
          const message = 'Email is sent to '; //${that.currentEmployee.FirstName} ${that.currentEmployee.LastName}`;
          notify({
            message,
            position: {
              my: 'center top',
              at: 'center top',
            },
          }, 'success', 3000);
        },
      };
      this.closeButtonOptions = {
        text: 'Close',
        onClick(e: any) {
          this.popupVisible = false;
        },
      };
  } 

  saveGridInstance(e: any){
    this.dataGrid.instance = e.component;
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
    console.log('selectionChanged');
  }


  RequestsList: any[];

  ngOnInit(): void {
    //this.refreshRequestsList();
    //this.getRequestsAxios();
  }

  refreshRequestsList(){
    this.service.getRequestsList().subscribe(data=>{
      this.dataSource2 = data
    })
  }

  //Запуск "Форма добавления заявки"
  addRequest(){
    this.popupVisible = true;
  }

  //Нажатая кнопка "Добавить" в "Форма добавления заявки"
  validateClick(e: any) {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      notify('Все поля заполнены, ожидайте конца загрузки', 'success');
      console.log('this.newRequest.name = '+this.newRequest.name+ this.newRequest.id);
      this.ctreateRequest(this.newRequest);
      setTimeout(() => {console.log('Создание заявки')},5000);
      this.dataGrid.instance.refresh();
      this.popupVisible = false;
      
    } else {
      notify('Заполните все поля', 'error');
    }
  }

  ctreateRequest(newRequest: Requests){
     newRequest.id = 0;
    console.log(newRequest);
    this.service.createRequest(newRequest).subscribe(
      (data: Requests) => {this.newRequest = data;}
      );
  }


  deleteRequests() {
    /* if(this.selectedItemKeys.length == 1){
      this.selectedItemKeys.forEach((key) => {
        this.deleteKeyRequest =  key;
        });
      console.log('key = '+ this.deleteKeyRequest);
      this.service.deleteteRequest(this.deleteKeyRequest).subscribe(
        (data: number) => {this.deleteKeyRequest = data}
      );
    } else{ */
      this.selectedItemKeys.forEach((key) => {
        this.deleteKeyRequest =  key;
        console.log('key = '+ this.deleteKeyRequest);
        this.service.deleteteRequest(this.deleteKeyRequest).subscribe(
          (data: number) => {this.deleteKeyRequest = data}
        );
      });
    //} 
    setTimeout(() => {console.log('Удаление заявки')},3000);
    this.dataGrid.instance.refresh();
  }

  updateRequest(){
    console.log(this.selectedItemKeys);
    console.log(this.dataGrid.instance.getSelectedRowsData()[0].name);
    this.editRequest = {
      id: this.selectedItemKeys[0],
      name: this.dataGrid.instance.getSelectedRowsData()[0].name
    }
    console.log(this.editRequest);

    this.requestEditPopupCustom = this.requestEditPopup + this.editRequest.id;//для отображения номера заявки
    this.popupEditVisible = true;
  }

  //Нажатая кнопка "Изменить" в "Форма изменения заявки"
  validateClickUpdate(e: any) {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      notify('Все поля заполнены, ожидайте конца загрузки', 'success');
      console.log('this.newRequest.name = '+this.editRequest.name+ this.editRequest.id);
      this.toEditRequest(this.editRequest);
      setTimeout(() => {console.log('Изменение заявки')},5000);
      this.dataGrid.instance.refresh();
      this.popupEditVisible = false;

    } else {
      notify('Заполните все поля', 'error');
    }
  }

  toEditRequest(newEditRequest: Requests){
    console.log(newEditRequest);
    this.service.editRequest(newEditRequest).subscribe(
      (data: Requests) => {newEditRequest = data;}
      );
  }

/*   changeFavoriteState(e: any) {
    const favoriteState = 'success';//!this.currentHouse.Favorite;
    const message = `This item has been ${
      favoriteState ? 'added to' : 'removed from'
    } the Favorites list!`;
    this.requestPopup = favoriteState;

    notify({
      message,
      width: 450,
    },
    favoriteState ? 'success' : 'error',
    2000);
  } */


}
