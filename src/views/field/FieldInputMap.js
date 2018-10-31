import FieldInput from './FieldInput';

export default class FieldInputMap{
    constructor(){
        this.map = new Map();
    }

    /**
     * 往map中添加表单，如果name在map中已经存在，则不会添加
     * @param name
     * @param fieldInput
     */
    put(name, fieldInput){
        if(name && typeof name === 'string'){
            if(!this.map.has(name)){
                if(fieldInput instanceof FieldInput){
                    let field = fieldInput.getField();
                    if(fieldInput.isStrict() || field.available){
                        this.map.set(name, fieldInput);
                    }
                }else if(fieldInput.filedInputAdapter){
                    this.map.set(name, fieldInput.filedInputAdapter);
                }
            }else{
                console.error(`name[${name}]在FieldInputMap中已经存在`);
            }
        }
    }
    forEach(func){
        this.map.forEach(func);
    }

    getSize() {
        return this.map.size;
    }
}