class Assert{
    hasText(obj){
        if(typeof obj === 'string'){
            return !!obj;
        }
        return false;
    }
    isNatural(obj){
        try{
            let str = obj.toString();
            return /^\d+$/.test(str);
        }catch(e){
            return false;
        }
    }
}
export default new Assert();