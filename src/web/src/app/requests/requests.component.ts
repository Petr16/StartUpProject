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
import CustomStore from 'devextreme/data/custom_store';
import { Requests } from '../shared/requests.model';
import { RequestsFormComponent } from './requests-form/requests-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  //@ViewChild(RequestsFormComponent, { static: false }) requestsFormComponent: RequestsFormComponent; //в родительском Angular component позволяет получить все свойства указанного дочернего компонента.

  /* let newRequest2: {
    id: 0,
    name:''
    customerId: number=0,
    startDate: Date=new Date,
    targetExecutionDate: Date=new Date,
    statusRequestId: number=0,
    modifyDate: Date=new Date,
    phone: string='',
  }; */
  minDate: Date = new Date();
  newRequest: Requests = new Requests(); /* = {
    id: 0,
    name:''
    customerId: number=0,
    startDate: Date=new Date,
    targetExecutionDate: Date=new Date,
    statusRequestId: number=0,
    modifyDate: Date=new Date,
    phone: string='',

    customerName: Customers,
    statusRequest: StatusRequests
  }; */
  customDataSource: CustomStore;
  dataSource2: Requests[] = [];
  
  selectedItemKeys: any[] = [];
  deleteKeyRequest: number = 0;
  deleteKeysRequest: number[] = [];
  selectedRequest: Requests;
  editRequest: Requests;//= {id: 0, name: ''}
  
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

  constructor(
    public service: RequestsService, 
    private router: Router
  ) { 
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
    this.newRequest.startDate = new Date();
    if (result.isValid) {
      notify('Все поля заполнены, ожидайте конца загрузки', 'success');
      console.log('this.newRequest.name = '+this.newRequest.name+ this.newRequest.id);
      console.log(this.newRequest);
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
      this.selectedItemKeys.forEach((key) => {
        this.deleteKeyRequest =  key;
        console.log('key = '+ this.deleteKeyRequest);
        this.service.deleteteRequest(this.deleteKeyRequest).subscribe(
          (data: number) => {this.deleteKeyRequest = data}
        );
      });
    setTimeout(() => {console.log('Удаление заявки')},3000);
    this.dataGrid.instance.refresh();
  }

  updateRequest(){
    console.log(this.selectedItemKeys[0]);
    console.log(this.dataGrid.instance.getSelectedRowsData()[0].name);
    this.editRequest = {
      id: this.selectedItemKeys[0],
      name: this.dataGrid.instance.getSelectedRowsData()[0].name,
      customerId: this.dataGrid.instance.getSelectedRowsData()[0].customerId,
      startDate: this.dataGrid.instance.getSelectedRowsData()[0].startDate,
      targetExecutionDate: this.dataGrid.instance.getSelectedRowsData()[0].targetExecutionDate,
      statusRequestId: this.dataGrid.instance.getSelectedRowsData()[0].statusRequestId,
      modifyDate: this.dataGrid.instance.getSelectedRowsData()[0].modifyDate,
      phone: this.dataGrid.instance.getSelectedRowsData()[0].phone,
      comment: this.dataGrid.instance.getSelectedRowsData()[0].comment

      /* customerName: {
        id: this.dataGrid.instance.getSelectedRowsData()[0].customerId,
        customername: this.dataGrid.instance.getSelectedRowsData()[0].Customers.name
      },
      statusRequest:{
        id: this.dataGrid.instance.getSelectedRowsData()[0].statusRequestId,
        statusrequestname: this.dataGrid.instance.getSelectedRowsData()[0].StatusRequests.name
      } */
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


  toRequestsForm(e: any){

    const request  = {
      id: this.selectedItemKeys[0],
      name: this.dataGrid.instance.getSelectedRowsData()[0].name,
      customerId: this.dataGrid.instance.getSelectedRowsData()[0].customerId,
      startDate: this.dataGrid.instance.getSelectedRowsData()[0].startDate,
      targetExecutionDate: this.dataGrid.instance.getSelectedRowsData()[0].targetExecutionDate,
      statusRequestId: this.dataGrid.instance.getSelectedRowsData()[0].statusRequestId,
      modifyDate: this.dataGrid.instance.getSelectedRowsData()[0].modifyDate,
      phone: this.dataGrid.instance.getSelectedRowsData()[0].phone ,
      comment: this.dataGrid.instance.getSelectedRowsData()[0].comment
     /* customerName: {
        id: this.dataGrid.instance.getSelectedRowsData()[0].customerId,
        customername: this.dataGrid.instance.getSelectedRowsData()[0].Customers.name
      },
      statusRequest:{
        id: this.dataGrid.instance.getSelectedRowsData()[0].statusRequestId,
        statusrequestname: this.dataGrid.instance.getSelectedRowsData()[0].StatusRequests.name
      } */
    }
    console.log(request);
    this.service.setData(request);
    this.router.navigateByUrl('/api/requests/requests-form');
  }


  onValueChangedDateBox(e: any){
    console.log(e.value);
    this.newRequest.targetExecutionDate = e.value;
  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:5000/${serverPath}`;
  }
  //"Resources\\Images\\Singular.jpg" - путь приходит с api GetPhotos() ссылка на репо https://github.com/CodeMazeBlog/aspnetcore-webapi-angular-file-download/tree/main/UploadFilesClient/src/app

  public onImgPath() {
    return `http://localhost:5000/Resources/Images/Singular.jpg`; //правильный путь
  }
}
