class Token{

    constructor(token = null){
        if(token){
            this.value = token.access_token;
            this.type  = token.token_type;
            this.valid = true;
        } else {
            this.valid = false;
        }
        
    }

    isValid(){
        return this.valid;
    }

    getValue(){
        return this.value;
    }

    getType(){
        return this.type;
    }
    

    async check(){
        const url = 'https://sbcb.inf.ufrgs.br/forense/api/v1/login/test-token';

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.value
            }
        });


        return response;
    }

}