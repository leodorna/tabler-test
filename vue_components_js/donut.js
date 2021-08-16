Vue.component("donut", {
    props : ['user', 'id', 'data'],
    template : "#donut-template",
    data : function(){
        return {
            idDiv: 'view-donut-'+this.$props.id,
            idDonut: 'donut'+this.$props.id
        }
    },
    mounted: async function(){
        let id = this.$props.id

        const resp = await session.getRequest('views/'+id+'/complete')

        const data = await resp.json();

        if(donut == null){
            donut = newDonut(this.$data.idDiv, this.$data.idDonut)
            donut.render()
        }

        updateDonut(this.$data.idDonut, data.prediction)

    },
    destroyed: function(){

    }
})