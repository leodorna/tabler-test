class Views{
    constructor(){

    }

    get(viewName){
        return {
            'eyes': [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ]
        }[viewName]
    }

}