let UserFormComponent = Vue.component( "form-user", {
        template: '#form-user-template',
        props: [],
        data: function (){
            return {
                user: this.$root.targetUser,
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
                success: null
            }
        },
        mounted: function(){
            Object.keys(this.formData).forEach(key => {
                if(key in this.user){
                    this.formData[key] = this.user[key]
                }
            })
        },
        methods: {
        }

    }
)