nav = Vue.component("nav-bar", {
    props : ['views', 'user'],
    template : "#navbar-menu",
    methods : {
        setView: function(id){
            this.$root.setView(id)
        }
    }
})