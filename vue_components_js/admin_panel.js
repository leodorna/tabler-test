
const AdminPanel = Vue.component(
    "admin-panel", {
        template: "#admin-panel",
        props: [],
        components: {
            'nacionalidade': SelectCountry
        },
        data: function(){
            return {
                success: null,
                users: [],
                categories: [],
                query: '',
                targetUser: {},
                skip: 0, // parametro pra por um offset no request de usuarios
                allUsersFetched: false, // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
                formData : {
                    'name': null,
                    'email': null,
                    'password': null,
                    'sample': null,
                    'date_of_birth': null,
                    'is_active': false,
                    'is_superuser': false,
                    'sex': null,
                    'weight': null,
                    'height': null,
                    'shoe_size': null,
                    'nationality': null
                },
                CREATE_USER: true,
                EDIT_USER : false,
                mode: null,
                timeout: null
            }
        },
        mounted: async function() {
            
            //form_object = new FormData(form)
            //this.formData =  Object.fromEntries(form_object.entries())
            parent = this
            document.querySelector('#pesquisa-nome').addEventListener('keyup', function (e) {
                clearTimeout(parent.timeout);
                
                this.timeout = setTimeout( async function () {
                    await parent.getUsers()
                }, 1000);
            });
            await this.getCategories()
            await this.getUsers()
        },
        methods: {
            createUser: function(){
                // event.preventDefault();
                // const data = new FormData(event.target);
                
                // //set true/false value to the superuser checkbox 
                // if(data.get('is_superuser')){
                //     data.set('is_superuser', false)
                // } else {
                //     data.set('is_superuser', true)
                // }
                
                // const dataToSend = Object.fromEntries(data.entries());

                // const response = await session.postRequest('users/', dataToSend)

                // if(response.ok){
                //     this.success = true
                //     let data = await response.json()
                //     this.users.push(data)
                //     this.cleanForm()
                // } else {
                //     this.success = false
                //     let data = await response.json()

                // }
                this.success = null
                this.mode = this.CREATE_USER

                this.cleanForm()

            },
            editUser: function(user){
                // let divForm = document.querySelector("#create-user-form")
                
                // divForm.reset()
                this.success = null
                this.mode = this.EDIT_USER

                this.cleanForm()

                this.targetUser = user

                Object.keys(this.formData).forEach(key => {
                    if(key in user){
                        this.formData[key] = user[key]
                    }
                })


            },
            getUsers: async function(){
                
                const resp = await session.getRequest('users/?skip=0'+this.queryGet())
                let users = await resp.json()
                this.pushUsers(users)
                // this.users.push(...users.data)
                
                this.increaseCountUsers()
                
                if(users.data.length == 0){
                    this.skip = this.users.length
                    this.allUsersFetched = true
                }
            },
            saveUser: async function(){
                if(this.mode === this.EDIT_USER){
                    const request = await session.patchRequest('users/update/'+this.targetUser.id, this.formData)
                    
                    if(request.ok){
                        this.success = true
                    } else {
                        this.success = false
                    }
                    console.log(await request.json())

                } 
                else if(this.mode === this.CREATE_USER){
                    const request = await session.postRequest('users/', this.formData)

                    if(request.ok){
                        this.success = true
                        let data = await request.json()
                        this.users.push(data)
                        this.cleanForm()
                    } else {
                        this.success = false    
                    }
                    console.log(await request.json())

                }

            },
            pushUsers: function(users){
                
                for(user of users.data){
                    has_user = this.users.filter( d => {
                        if(user.name == d.name) return true
                    }).length
                    if(has_user > 0) continue
                    else this.users.push(user)
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
                let regexQuery = new RegExp(this.query.toLowerCase())
                return this.users.filter( d => {
                    if(d.name){
                        return d.name.toLowerCase().match(regexQuery)
                    } 
                }) 
            },
            cleanForm: function(){
                // document.querySelector("#create-user-form").reset()
                this.formData = {
                    'name': null,
                    'email': null,
                    'password': null,
                    'sample': null,
                    'date_of_birth': null,
                    'is_active': false,
                    'is_superuser': false,
                    'sex': null,
                    'weight': null,
                    'height': null,
                    'shoe_size': null,
                    'nationality': null
                }
            }

        }
    }
)