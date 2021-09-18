const Category = Vue.component("category-template", {
    props: ['cat'],
    template: "#category-template",
    data:  function(){
        return {
            targetUser: this.$root.targetUser,
            category: this.$props.cat
        }
    },
    mounted: function(){
    },
    methods: {
    }

})