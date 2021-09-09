var DonutComponent = Vue.component("donut", {
    props : ['user', 'id', 'targetUser', 'prediction'],
    template : "#donut-template",
    data : function(){
        return {
            idDiv: 'view-donut-'+this.$props.id,
            idDonut: 'donut'+this.$props.id,
            donut: null
        }
    },
    mounted: async function(){

        // const fetchUrl = this.$root.getViewUrl(this.$props.id, this.$props.targetUser)

        // const resp = await session.getRequest(fetchUrl)        
        
        // const data = await resp.json();

        if(this.donut == null){
            this.donut = newDonut(this.$data.idDiv, this.$data.idDonut)

        }
        this.donut.render()
        if(this.$props.prediction){
            updateDonut(this.$data.idDonut, this.$props.prediction)
        }
        
    },
    destroyed: function(){
        this.donut.destroy()
    },
    watch: {
        prediction:{
            handler: function(){
            }
        }
    }
})