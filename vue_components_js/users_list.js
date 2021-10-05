const UsersList = Vue.component("users-list", {
    props: [],
    template: "#users-list-template",

    data:  function(){
        return {
            users: [],
            query: '',
            skip: 0, // parametro pra por um offset no request de usuarios
            allUsersFetched: false // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
        }
    },
    mounted: async function(){
        const resp = await session.getRequest('users/')

        let users = await resp.json()
        this.users = users.data;

        this.increaseCountUsers() 
    },
    methods: {
        getInfoUser: async function(user){
            this.$root.targetUser = user
            console.log(this.$root.targetUser)
        },
        filterUsers: function(){
            let regexQuery = new RegExp('^'+this.query.toLowerCase())
            return this.users.filter( d => {
                if(d.sample){
                    return d.sample.toLowerCase().match(regexQuery)
                } 
            }) 
        },
        getUsers: async function(){
            const resp = await session.getRequest('users/?skip='+this.skip)
            let users = await resp.json()

            this.users.push(...users.data)
            
            this.increaseCountUsers()
            
            if(users.data.length == 0) this.allUsersFetched = true
        },
        increaseCountUsers: function(){
            this.skip += 100 // numero de usuarios pegos
        }
    }

})