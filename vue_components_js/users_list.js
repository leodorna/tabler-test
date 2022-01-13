const UsersList = Vue.component("users-list", {
    props: [],
    template: "#users-list-template",
    components: {
        'formUser': UserFormComponent
    },
    data:  function(){
        return {
            users: [],
            query: '',
            skip: 0, // parametro pra por um offset no request de usuarios
            timeout: null,
            allUsersFetched: false, // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
            rowsNumber: 10,
            searchType: 0,
            targetUser: null
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

    },
    methods: {
        getInfoUser: async function(user){
            this.$root.targetUser = user
        },
        get_initials: function(name){
            const names_array = name.split(' ')
            return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
        },
        filterUsers: function(){
            let regexQuery = new RegExp(this.query.toLowerCase())
            return this.users.filter( d => {
                if(this.searchType == 0){    
                    if(d.name && !d.is_superuser){
                        return d.name.toLowerCase().match(regexQuery)
                    } 
                }
                else{
                    if(d.sample && !d.is_superuser){
                        return d.sample.toLowerCase().match(regexQuery)
                    } 
                }
            }).slice(0, Number(this.rowsNumber))
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
            if(this.searchType == 0){
                const request = await session.getRequest('users/?name='+query)
            } else {
                const request = await session.getRequest('users/?sample='+query)
            }
            let users = await request.json()

            return users
        },
        placeholder: function(){
            if(this.searchType == 0){
                return "Pesquise o nome do usuário..."
            } else {
                return "Pesquise o nome da amostra..."
            }
        },
        editUser: function(user){
            this.$root.targetUser = user
            this.targetUser = user
        },
        saveEdit: async function(){
            let formData = this.$refs.formuser.formData;

            const request = await session.patchRequest('users/update/'+this.$refs.formuser.user.id, formData);

            let data = await request.json()

            if(request.ok){
                this.success = true
                this.$refs.formuser.success = true
            } else {
                this.success = false
                this.$refs.formuser.success = false
            }

            parent = this

            setTimeout(function(){
                parent.success = null
            }, 6000)
        }
    }

})