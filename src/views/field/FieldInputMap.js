import FieldInput from './FieldInput';
import Assert from '../../utils/Assert';

class SetMap{
    constructor(){
        this.map = new Map();
    }
    put(key, item){
        let array = this.get(key);
        if(!array){
            array = new Set();
            this.map.set(key, array);
        }
        array.add(item);
    }

    /**
     *
     * @param key
     * @return Array 返回key为关键字的集合的数组备份
     */
    get(key){
        let array = this.map.get(key);
        if(array){
            return Array.from(array);
        }
    }
    has(key){
        return this.map.has(key);
    }
    delete(key){
        return this.map.delete(key);
    }
    getItem(key, index){
        Assert.hasText(key);
        Assert.isNatural(index);
        let array = this.get(key);
        if(array){
            return array[index];
        }
    }
}

export default class FieldInputMap{
    constructor(){
        this.map = new SetMap();
        this.uuidMap = new Map();
    }

    /**
     * 往map中添加表单，如果name在map中已经存在，则不会添加
     * @param name
     * @param fieldInput
     */
    put(name, fieldInput){
        if(name && typeof name === 'string'){
            let uuid = null,
                theInput = null;
            if(fieldInput instanceof FieldInput){
                let uuid = fieldInput.getUUID();
                let field = fieldInput.getField();
                if(fieldInput.isStrict() || field.available){
                    theInput = fieldInput;
                }
            }else if(fieldInput.filedInputAdapter){
                uuid = fieldInput.getUUID();
                theInput = fieldInput.filedInputAdapter;
            }
            if(uuid && this.uuidMap.has(uuid)){
                console.error(`name[${name}]在FieldInputMap中已经存在`);
            }
            if(uuid && theInput){
                this.map.set(name, theInput);
                this.uuidMap.put(uuid, theInput);
            }
        }
    }
    remove(name, fieldInput){
        if(name && fieldInput){
            let exists = this.map.get(name);
            if(exists === fieldInput){
                this.map.delete(name);
            }
        }
    }
    forEach(func){
        this.map.forEach(func);
    }
    clear(){
        this.map.clear();
    }
    getSize() {
        return this.map.size;
    }
}