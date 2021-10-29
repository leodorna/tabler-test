const AdminPanel = Vue.component(
    "admin-panel", {
        template: "#admin-panel",
        props: [],
        data: function(){
            return {
                success: false,
                users: [],
                query: '',
                skip: 0, // parametro pra por um offset no request de usuarios
                allUsersFetched: false // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
            }
        },
        mounted: async function() {
            const form = document.querySelector('#create-user-form');
            form.addEventListener('submit', this.createUser);

            await this.getUsers()
        },
        methods: {
            createUser: async function(event){
                event.preventDefault();
                const data = new FormData(event.target);
                
                //set true/false value to the superuser checkbox 
                if(data.get('is_superuser')){
                    data.set('is_superuser', false)
                } else {
                    data.set('is_superuser', true)
                }

                data.set('id', 999)

                const dataToSend = Object.fromEntries(data.entries());

                this.success = true
                const response = await session.postRequest('users/', dataToSend)

                if(response.ok){
                    let data = await response.json()
                     console.log(data)
                } else {
                    let data = await response.json()
                    console.log(data)
                }

            },
            getUsers: async function(){
                const resp = await session.getRequest('users/?skip='+this.skip)
                let users = await resp.json()
    
                this.users.push(...users.data)
                
                this.increaseCountUsers()
                
                if(users.data.length == 0) this.allUsersFetched = true
            },
            scrolled: async function(){
                let div = document.querySelector("#users-section-admin" )
                if (div.offsetHeight + div.scrollTop >= div.scrollHeight) {  
                    await this.getUsers()
                }  
            },
            increaseCountUsers: function(){
                this.skip += 100 // numero de usuarios pegos
            },
            filterUsers: function(){
                let regexQuery = new RegExp('^'+this.query.toLowerCase())
                return this.users.filter( d => {
                    if(d.name){
                        return d.name.toLowerCase().match(regexQuery)
                    } 
                }) 
            }
        }
    }
)