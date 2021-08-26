Vue.component("users-list", {
    props: [],
    template: "#users-list-template",

    data:  function(){
        return {
            users: []
        }
    },
    mounted: async function(){

        const resp = await session.getRequest('users/')

        let users = await resp.json()
        this.users = users.data;

    },
    methods: {
        getInfoUser: async function(userId, user){
            user['id'] = userId
            this.$root.targetUser = user               
        }
    }

})