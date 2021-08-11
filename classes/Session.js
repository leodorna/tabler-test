class Session{
    constructor(baseUrl){
        this.token = null
        this.baseUrl = baseUrl
    }

    redirect(absolutePath){; 
        window.location.href = absolutePath;
    }

    // return request header with the valid token
    getRequestHeader(){
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ this.token.getValue()
        }
    }

    // send post request to the url
    async postRequest(relativePath, body = ''){

        const url = this.baseUrl + relativePath.replace('./', ''); // absolut path

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: this.getRequestHeader(),
            body: JSON.stringify(body) 
        });

        return response;
    }

    async getRequest(relativePath){

        
        const url = this.baseUrl + relativePath.replace('./', ''); // absolut path

        const response = await fetch(url, {
            method: 'GET', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: this.getRequestHeader()
        });

        return response;
    }

    // collect and check on the server if token is alive 
    async collectToken(){

        const tokenObj = JSON.parse(localStorage.getItem('token'));
        this.token = new Token(tokenObj);

        if(!this.token.isValid()){
            throw new Error("It couldn't find any token in the local storage.") 
        }

        const response = await this.token.check();

        if(!response.ok){
            throw new Error('Your token has expired.');
        } 

        return response.json();
    }

     logout(){
        localStorage.removeItem('token')
        this.redirect('file:///home/leo/repo/tabler-test/login.html')
    }
}