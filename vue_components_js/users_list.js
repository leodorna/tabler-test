const UsersList = Vue.component("users-list", {
    props: [],
    template: "#users-list-template",

    data:  function(){
        return {
            users: [],
            query: ''
        }
    },
    mounted: async function(){

        const resp = await session.getRequest('users/')

        let users = await resp.json()
        this.users = users.data;

    },
    computed: {

    },
    methods: {
        getInfoUser: async function(userId, user){
            user['id'] = userId
            this.$root.targetUser = user               
        },
        filterUsers: function(){
            let regexQuery = new RegExp('^'+this.query.toLowerCase())
            return this.users.filter( d => {
                if(d.sample){
                    return d.sample.toLowerCase().match(regexQuery)
                } 
            }) 
        }
    }

})