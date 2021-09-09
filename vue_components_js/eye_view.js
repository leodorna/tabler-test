Vue.component("eyes-view", {
    props : ['view', 'targetUser'],
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
            user: this.$root.user
        }
    },
    methods: {
        getDescription: function(id){
            return this.$root.getDescription(id)
        }
    },
    mounted: async function(){
        
        const fetchUrl = this.$root.getViewUrl(this.$props.view.id, this.$props.targetUser.id)

        const resp = await session.getRequest(fetchUrl)

        let data = await resp.json()
        
        this.title = data.title
        this.prediction = data.prediction
        this.classe_real = data.classe_real

        console.log(data.prediction)

        this.snps = data.snps.map( d => {
            d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
            d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
            return d;
        })

    }
    
})