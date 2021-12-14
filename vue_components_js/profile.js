const ProfilePage = Vue.component("profile-page", {
    props: [],
    
    template: "#profile-template",
    data: function(){
        return {
            user: this.$root.user,
            initials: this.get_initials()
        }
    },
    mounted: async function (){
        console.log(this.$root.user)
    },

    methods: {
        get_initials: function(){
            const names_array = this.$root.user.name.split(' ')
            return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
        }
    }
})