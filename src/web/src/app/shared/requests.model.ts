/* import { Customers } from "./customers.model";
import { StatusRequests } from "./status-requests.model"; */

export class Requests {
    id: number=0; //чтобы убрать подчеркивание поля необходимо в tsconfig.json  добавить свойство  "strictPropertyInitialization": false,
    name: string='';
    customerId: number=0;
    startDate: Date=new Date();
    targetExecutionDate: Date=new Date();
    statusRequestId: number=0;
    modifyDate: Date=new Date();
    phone: string='';
    comment: string='';
    fileUrl: string='';

    /* customerName: Customers;
    statusRequest: StatusRequests; */





    /* constructor(){
        this.id = 0;
        this.name= ''
    } */
}
