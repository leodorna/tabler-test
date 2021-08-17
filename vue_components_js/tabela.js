Vue.component("tabela", {
    props: ["id", "targetUser"],
    template: "#tabela-template",

    data:  function(){
        return {
            snps: []
        }
    },
    mounted: async function(){
        let id = this.$props.id

        const fetchUrl = this.$root.getViewUrl(this.$props.id, this.$props.targetUser)

        const resp = await session.getRequest(fetchUrl)

        const data = await resp.json()
        console.log(data)
        this.snps = data.snps.map( d => {
                        d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
                        d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
                        return d;
                    })
        
    }

})