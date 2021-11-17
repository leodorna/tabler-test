const ListCategories = Vue.component("ListCategories", {
    props: [],
    template: "#list-categories",
    components:{
        'map': MapComponent
    },
    data:  function(){
        return {
            categories: [],
            targetUser: this.$root.targetUser,
            user: this.$root.user
        }
    },
    mounted: async function(){

        await this.fetchTargetUser()

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
    methods: {
        setView: function(category){
            this.$root.setView(category)
        },
        fetchTargetUser: async function(){
            const targetUserResponse = await session.getRequest('users/'+this.$route.params.id)
            
            this.targetUser = await targetUserResponse.json()
        }
    }

})