Vue.component("donut", {
    props : ['user', 'id', 'data'],
    template : "#donut-template",
    data : function(){
        return {
            idDiv: 'view-donut-'+this.$props.id,
            idDonut: 'donut'+this.$props.id,
            donut: null
        }
    },
    mounted: async function(){
        let id = this.$props.id

        const resp = await session.getRequest('views/'+id+'/complete')

        const data = await resp.json();
        if(this.donut == null){
            this.donut = newDonut(this.$data.idDiv, this.$data.idDonut)

        }

        this.donut.render()
        
        console.log(document.getElementById(this.$data.idDiv))
        updateDonut(this.$data.idDonut, data.prediction)

    },
    destroyed: function(){
        this.donut.destroy()
    }
})