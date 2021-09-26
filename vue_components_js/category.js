const Category = Vue.component("category-template", {
    props: [],
    template: "#category-template",
    data:  function(){
        return {
            id: this.$route.params.category,
            views: [],
            targetUser: this.$root.targetUser
        }
    },
    mounted: async function(){
        this.fetchCategory()
    },
    methods: {
        fetchCategory: async function(){
            const viewsResponse = await session.getRequest('views/category/'+this.id)
            const viewsJson = await viewsResponse.json()

            this.views = viewsJson

        },
        fetchTargetUser: async function(){
            const userResponse = await session.getRequest('users/'+this.$route.params.id)
            const user = await userResponse.json()

        }
    }

})