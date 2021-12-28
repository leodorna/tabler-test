const ProfilePage = Vue.component("profile-page", {
    props: [],
    
    template: "#profile-template",
    data: function(){
        return {
            user: this.$root.user,
            initials: this.get_initials(),
            enableSave: false,
            success: null
        }
    },
    mounted: async function (){
        console.log(this.$root.user)
    },

    methods: {
        get_initials: function(){
            const names_array = this.$root.user.name.split(' ')
            return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
        },

        edit_section: function(e){
            
            e.target.closest(".section-profile")
                    .querySelectorAll("input")
                    .forEach( 
                        d => {
                            d.removeAttribute('disabled')
                        }
                    )

        },

        save: async function(){
            const request = await session.patchRequest('users/update/', this.user)
            let data = await request.json()

            if(request.ok){
                this.success = true
            } else {
                this.success = false
            }

            parent = this

            setTimeout(function(){
                parent.success = null
            }, 6000)
        }

    }
})