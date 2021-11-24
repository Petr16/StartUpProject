import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
import { Customers } from 'src/app/shared/customers.model';
import { CustomersService } from 'src/app/shared/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  newCustomer: Customers = {id: 0,customername:''};
  customDataSource: CustomStore;
  dataSource2: Customers[] = [];
  customername: string = '';
  
  selectedItemKeys: any[] = [];
  deleteKeyCustomer: number = 0;
  deleteKeysCustomer: number[] = [];
  selectedCustomer: Customers;
  editCustomer: Customers;//= {id: 0, name: ''}
  
  popupVisible = false;//закрыт или открыт наш dialog для создания заявки
  customerPopup = 'Форма добавления заказчика';
  popupEditVisible = false;//закрыт или открыт наш dialog для изменения заявки
  customerEditPopup = 'Форма изменения заказчика ';
  customerEditPopupCustom = '';
  
  emailButtonOptions: any;
  closeButtonOptions: any;

  
  phoneRules: any = {
    X: /[02-9]/,
  };
  labelMode = 'static';
  stylingMode = 'filled';



  constructor(
    public service: CustomersService, 
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
          const response = await fetch('http://localhost:5000/api/customers');
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
    });
    console.log(this.dataGrid);
    console.log(this.customDataSource.key());

          //Для popup типа снекбара
          this.emailButtonOptions = {
            icon: 'email',
            text: 'Send',
            onClick(e: any) {
              const message = 'Email is sent to '; 
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



/////методы


   saveGridInstance(e: any){
    this.dataGrid.instance = e.component;
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
    console.log('selectionChanged');
  }


  ngOnInit(): void {
  }

  refreshRequestsList(){
    this.service.getCustomersList().subscribe(data=>{
      this.dataSource2 = data
    })
  }

    //Запуск "Форма добавления заказчика"
    addCustomer(){
      this.popupVisible = true;
    }

    //Нажатая кнопка "Добавить" в "Форма добавления заказчика"
  validateClick(e: any) {
    const result = e.validationGroup.validate();
    console.log(this.customername)
    this.newCustomer.customername = this.customername;
    console.log('Создание заказчика'+ this.newCustomer.customername)
    if (result.isValid) {
      notify('Все поля заполнены, ожидайте конца загрузки', 'success');
      console.log('this.newCustomer.name = '+this.newCustomer.customername+ this.newCustomer.id);
      this.ctreateCustomer(this.newCustomer);
      setTimeout(() => {console.log('Добавление заказчика');
                        this.dataGrid.instance.refresh();
                        },1000);
      this.popupVisible = false;

    } else {
      notify('Заполните все поля', 'error');
    }
    
  }

  ctreateCustomer(newCustomer: Customers){
    newCustomer.id = 0;
    console.log(newCustomer);
    console.log("newCustomer");
    this.service.createCustomer(newCustomer).subscribe(
      (data: Customers) => {this.newCustomer = data;}
      );
  }


  deleteCustomers() {
      this.selectedItemKeys.forEach((key) => {
        this.deleteKeyCustomer =  key;
        console.log('key = '+ this.deleteKeyCustomer);
        this.service.deleteteCustomer(this.deleteKeyCustomer).subscribe(
          (data: number) => {this.deleteKeyCustomer = data}
        );
      });
    setTimeout(() => {console.log('Удаление заказчика')
                      this.dataGrid.instance.refresh();
                      },1000);
    
  }

  updateCustomer(){
    console.log(this.selectedItemKeys[0]);
    console.log(this.dataGrid.instance.getSelectedRowsData()[0].name);
    this.editCustomer = {
      id: this.selectedItemKeys[0],
      customername: this.dataGrid.instance.getSelectedRowsData()[0].customername
    }
    console.log(this.editCustomer);

    this.customerEditPopupCustom = this.customerEditPopup + this.editCustomer.id;//для отображения номера заявки
    this.popupEditVisible = true;
  }

  //Нажатая кнопка "Изменить" в "Форма изменения заказчика"
  validateClickUpdate(e: any) {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      notify('Все поля заполнены, ожидайте конца загрузки', 'success');
      console.log('this.newRequest.name = '+this.editCustomer.customername+ this.editCustomer.id);
      this.toEditCustomer(this.editCustomer);
      setTimeout(() => {console.log('Изменение заказчика');
                        this.dataGrid.instance.refresh();
                      },1000);
      
      this.popupEditVisible = false;

    } else {
      notify('Заполните все поля', 'error');
    }
  }

  toEditCustomer(newEditRequest: Customers){
    console.log(newEditRequest);
    this.service.editCustomer(newEditRequest).subscribe(
      (data: Customers) => {newEditRequest = data;}
      );
  }


}
