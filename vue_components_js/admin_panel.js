const AdminPanel = Vue.component(
    "admin-panel", {
        template: "#admin-panel",
        props: [],
        data: function(){
            return {
                success: null,
                users: [],
                categories: [],
                query: '',
                skip: 0, // parametro pra por um offset no request de usuarios
                allUsersFetched: false, // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
                formData : {
                    'name': null,
                    'email': null,
                    'password': null,
                    'sample': null,
                    'date_of_birth': null,
                    'is_superuser': false,
                    'sex': null,
                    'weight': null,
                    'height': null,
                    'shoe_size': null,
                    'nationality': null
                }
            }
        },
        mounted: async function() {
            const form = document.querySelector('#create-user-form');
            form.addEventListener('submit', this.createUser);
            
            //form_object = new FormData(form)
            //this.formData =  Object.fromEntries(form_object.entries())
            await this.getCategories()
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
                console.log(this.formData)
                const dataToSend = Object.fromEntries(data.entries());

                const response = await session.postRequest('users/', dataToSend)

                if(response.ok){
                    this.success = true
                    let data = await response.json()
                    this.users.push(data)
                    this.cleanForm()
                } else {
                    this.success = false
                    let data = await response.json()

                }


            },
            editUser: async function(user){
                let divForm = document.querySelector("#create-user-form")
                
                divForm.reset()
                
                Object.keys(this.formData).forEach(key => {
                    
                    if(key in user){
                        this.formData[key] = user[key]
                    }
                })
                

            },
            getUsers: async function(){
                const resp = await session.getRequest('users/?skip='+this.skip)
                let users = await resp.json()
    
                this.users.push(...users.data)
                
                this.increaseCountUsers()
                
                if(users.data.length == 0){
                    this.skip = this.users.length
                    this.allUsersFetched = true
                }
            },
            getCategories: async function(){
                const categoriesResponse = await session.getRequest('categories/')
                const categoriesJson = await categoriesResponse.json()

                for(let category of categoriesJson.data){
                    let viewsResponse = await session.getRequest('views/category/'+category.id)
                    let viewsJson = await viewsResponse.json()
                    
                    this.categories.push({
                        id: category.id,
                        name: category.name,
                        views: viewsJson
                    })
                }        


            },
            scrolled: async function(){
                let div = document.querySelector("#users-section-admin" )
                if (div.offsetHeight + div.scrollTop >= div.scrollHeight && !this.allUsersFetched) {  
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
            },
            cleanForm: function(){
                document.querySelector("#create-user-form").reset()
            }
        }
    }
)