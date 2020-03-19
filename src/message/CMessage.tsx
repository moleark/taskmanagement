import { QueryPager } from 'tonva';
import { CUqBase } from '../CBase';
import { VMessage } from './VMessage';
import { observable } from 'mobx';

export class CMessage extends CUqBase {
    @observable pageMessage: QueryPager<any>;
    count = observable.box<number>(0);
    //初始化
    protected async internalStart(param: any) {
        //this.pageMessage = null;
        this.searchNowMessage(); // 从constructor移过来的
        await this.showMessage();
    }

    //搜索未读信息
    searchNowMessage = async () => {
        let messages = await this.uqs.salesTask.searchNowMessage.table({});
        if (messages && messages.length > 0) {
            this.count.set(messages[0].count);
        } else {
            this.count.set(0);
        }
    }

    //更新消息
    updateNowMessage = async () => {
        await this.uqs.salesTask.UpdateNowMessage.submit({});
        await this.searchNowMessage();
    }

    //显示消息
    showMessage = async () => {
        await this.searchMessage();
        this.openVPage(VMessage, this.pageMessage);
        await this.updateNowMessage();
    }

    //搜索消息
    searchMessage = async () => {
        this.pageMessage = new QueryPager(this.uqs.salesTask.searchMessage, 15, 30);
        await this.pageMessage.first({});
    }


}