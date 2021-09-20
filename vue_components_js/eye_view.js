const EyesView = Vue.component("eyes-view", {
    props : ['view'],
    template : "#eyes-view-template",
    components: {
        'donut': DonutComponent,
        'tabela': TableComponent
    },
    data: function(){
        return {
            snps: [],
            prediction: 0,
            classe_real: '',
            title: '',
            description: this.$props.view.description,
            user: this.$root.user,
            targetUser: this.$root.targetUser
        }
    },
    methods: {
        getDescription: function(id){
            return this.$root.getDescription(id)
        }
    },
    mounted: async function(){
        
        const fetchUrl = this.$root.getViewUrl(this.$props.view.id, this.$root.targetUser.id)
        
        const resp = await session.getRequest(fetchUrl)

        let data = await resp.json()
        
        this.title = data.title
        this.prediction = data.prediction
        this.classe_real = data.classe_real

        this.snps = data.snps.map( d => {
            d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
            d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
            return d;
        })

    }
    
})