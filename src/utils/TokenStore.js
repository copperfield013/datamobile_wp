
let datamobileTokenName = 'datamobile-token';
class TokenStore{
    setToken(token) {
        window.localStorage.setItem(datamobileTokenName, token);
    }
    getToken(){
        return  window.localStorage.getItem(datamobileTokenName);
    }
    getTokenName(){
        return datamobileTokenName;
    }
}

export default new TokenStore();