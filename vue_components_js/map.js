const MapComponent = Vue.component("map-view", {
    props: [],
    template: "#map-template",

    data:  function(){
        return {
            map: null,
            svg: null
        }
    },
    mounted: async function(){
        let fetchUrl = 'ancestry/prediction/1/'
        
        if(this.$root.user.is_superuser){
            fetchUrl += this.$route.params.id
        }

        this.createMap()
        
        const mapRequest = await session.getRequest(fetchUrl)
        const mapJson = await mapRequest.json()

        if(this.$root.user.is_superuser){
            this.fillMap(mapJson.areas)
        } else {
            this.fillMap(mapJson)
        }

    },
    methods: {
        createMap: function(){
            const map = L
                .map('gencove')
                .setView([14, 2], 3);   // center position + zoom
                
                // Add a tile to the map = a background. Comes from OpenStreetmap
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
                maxZoom: 6,
                }).addTo(map);
            
            // Add a svg layer to the map
            L.svg({clickable: true}).addTo(map);
            

            const overlay = d3.select(map.getPanes().overlayPane)
            let svg = overlay.select('svg').attr("pointer-events", "auto")    

            this.map = map
            this.svg = svg

        },
        fillMap: function(data){

            console.log(data)
            data.forEach( d => {
                let coords = turf.polygonSmooth(turf.polygon(d.region), {iterations: 8})
                var polyline = L.geoJson(coords, {color: d.color}).addTo(this.map);
              })
        }
    }

})