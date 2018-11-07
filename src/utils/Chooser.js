export default class Chooser{
    constructor(param){
        this.param = {...{
            multiple: true
        }, ...param};
        this.selected = [];
        this.selectCallback = null;
    }
    collectSelected(collector) {
        let res = [];
        this.selected.forEach((item)=>{
            let t = collector(item);
            if(t !== undefined){
                res.push(t);
            }
        });
        return res;
    }
    select(item){
        let toSelect = false;
        if(this.param.multiple){
            let index = this.selected.indexOf(item);
            if(index >= 0){
                this.selected.splice(index, 1);
                //已选，当前要取消
                toSelect = false;
            }else{
                this.selected.push(item);
                //未选，当前要选中
                toSelect = true;
            }
        }
        return new Promise((resolve)=>{
            if(this.selectCallback){
                this.selectCallback(this);
            }
            resolve(toSelect);
        });
    }

    bindSelect(callback) {
        this.selectCallback = callback;
    }
}
