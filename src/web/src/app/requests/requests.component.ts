import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { 
  DxDataGridModule, 
  DxButtonModule, 
  DxDataGridComponent
} from 'devextreme-angular';
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

  //dataSource: ArrayStore;
  customDataSource: CustomStore;
  dataSource2: Requests[] = [];
  //states: State[];

  selectedItemKeys: any[] = [];

  constructor(public service: RequestsService) { 
    /* this.dataSource = new ArrayStore({
      key: 'ID',
      data: service.getRequestsList().subscribe(data=>{
        this.RequestsList=data;
      }),
    }); */
    //this.states = service.getStates();
    /* this.dataSource = new CustomStore({
      key: 'ID',
      loadMode: 'raw',
      load: () => service.getRequestsList().toPromise().then((data: any) => (data.data))
      .catch((e) => {
        throw e && e.error && e.error.Message;
      }),
      })  */

      function isNotEmpty(value: any) {
        return value !== undefined && value !== null && value !== '';
      }
      
      this.customDataSource = new CustomStore({
        key: 'id',
        load(loadOptions: any) {
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
          return fetch('http://localhost:5000/api/requests')
            .then(response => response.json())
            .then(data => ({
              data: data.data,
              totalCount: data.totalCount,
              summary: data.summary,
              groupCount: data.groupCount,
            }))
            .catch(e => { throw e; });
        },
      });
      console.log(this.customDataSource.key());
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
  //ArrayStore: any[];
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

  /* private async fetchRequests() {
    this.dataSource = await this.getRequestsAxios();
  } */

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
