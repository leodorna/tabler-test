nav = Vue.component("nav-bar", {
    props : ['categories', 'user'],
    template : "#navbar-menu",
    methods : {
        setView: function(c){
            this.$root.setView(c)
        }
    }
})