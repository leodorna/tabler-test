const UsersList = Vue.component("users-list", {
    props: [],
    template: "#users-list-template",

    data:  function(){
        return {
            users: [],
            query: '',
            skip: 0, // parametro pra por um offset no request de usuarios
            timeout: null,
            allUsersFetched: false // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
        }
    },
    mounted: async function(){

        parent = this
            document.querySelector('#pesquisa-usuario').addEventListener('keyup', function (e) {
                clearTimeout(parent.timeout);
                
                this.timeout = setTimeout( async function () {
                    await parent.getUsers()
                }, 1000);
        });


        await this.getUsers()

        // const resp = await session.getRequest('users/')

        // let users = await resp.json()
        // this.users = users.data;

        // this.increaseCountUsers() 
    },
    methods: {
        getInfoUser: async function(user){
            this.$root.targetUser = user
            console.log(this.$root.targetUser)
        },
        filterUsers: function(){
            let regexQuery = new RegExp(this.query.toLowerCase())
            console.log(this.query)
            return this.users.filter( d => {
                if(d.name){
                    return d.name.toLowerCase().match(regexQuery)
                } 
            }) 
        },
        getUsers: async function(){
            

            const resp = await session.getRequest('users/?skip=0'+this.queryGet())

            let users = await resp.json()

            this.pushUsers(users)
            
            this.increaseCountUsers()
            
            if(users.data.length == 0){
                this.skip = this.users.length
                this.allUsersFetched = true
            }
        },
        increaseCountUsers: function(){
            this.skip += 100 // numero de usuarios pegos
        },
        pushUsers: function(users){
            for(user of users.data){

                has_user = this.users.filter( d => {
                    if(user.name == d.name) return true
                }).length

                if(has_user > 0){
                    continue
                } 
                else{
                    this.users.push(user)
                } 
            }
        },
        queryGet: function(){ 
            if(this.query == '') return ''
            else return '&name='+this.query   
        },
        findUsers: async function(query){
            const request = await session.getRequest('users/?name='+query)
            let users = await request.json()

            return users
        }
    }

})