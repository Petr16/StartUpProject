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


  customDataSource: CustomStore;
  dataSource2: Requests[] = [];
  
  selectedItemKeys: any[] = [];
  
  popupVisible = false;
  ADD_TO_FAVORITES = 'Add to Favorites';
  REMOVE_FROM_FAVORITES = 'Remove from Favorites';
  requestPopup = 'Форма добавления заявки';
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

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    this.selectedItemKeys.forEach((key) => {
      this.customDataSource.remove(key);
    });
    this.dataGrid.instance.refresh();
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = 'always';

    e.toolbarOptions.items.push({
      location: 'after',
      template: 'deleteButton',
    });
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

  addRequest(){
    this.popupVisible = true;
  }

  validateClick(e: any) {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      notify('The task was saved successfully.', 'success');
    } else {
      notify('The task was not saved. Please check if all fields are valid.', 'error');
    }
  }

  changeFavoriteState(e: any) {
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
  }

  async getRequestsAxios() {
    /* try {
      const response = await axios.get(`http://${apiHost}${endPoints.AdminRoles}`);
      return response.data.data;
    } catch (e) {
      console.error(e);
      throw new Error('При получении ролей возникла ошибка');
    } */

    /* try {
      const response = await fetch('http://localhost:5000/api/requests');
      const data = await response.json();
      const { results: [requests] } = data;
      return requests
    } catch (e) {
      console.error(e);
      throw new Error('При получении заказов возникла ошибка');
    } */
  }

}
