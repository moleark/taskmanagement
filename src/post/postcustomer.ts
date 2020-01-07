
import { observable } from 'mobx';

export class PostCustomer {

    @observable customerlist: any[] = [];
    @observable post: any;

    add(customerid: any, post: any) {
        let index = this.customerlist.indexOf(customerid);
        if (index === -1) {
            this.customerlist.push(customerid);
            this.post = post;
        } else {
            this.remove(customerid);
        }
    }

    remove(customerid: any) {
        let index = this.customerlist.findIndex(v => v === customerid);
        if (index >= 0) this.customerlist.splice(index, 1);
    }

    clearAll() {
        this.customerlist.splice(0, this.customerlist.length);
        this.post = null;
    }

    getIds(): string {
        let result: string = "";
        this.customerlist.forEach(element => {
            result += element + '-';
        });
        if (result.length > 0) {
            result = result.substring(0, result.length - 1)
        }
        return result;
    }
}
