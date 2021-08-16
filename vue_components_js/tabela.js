Vue.component("tabela", {
    props: ["id"],
    template: "#tabela-template",

    data:  function(){
        return {
            snps: []
        }
    },
    mounted: async function(){
        let id = this.$props.id

        const resp = await session.getRequest('views/'+id+'/complete')

        const data = await resp.json()
        
        this.snps = data.snps.map( d => {
                        d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
                        d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
                        return d;
                    })
        
    }

})