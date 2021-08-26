Vue.component("voltar", {
    props : [],
    template : "#voltar-template",
    methods : {
        back: function(){
            this.$root.targetUser = null
        }
    }
})