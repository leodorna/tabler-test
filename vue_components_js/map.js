optionsGeoJson = {
    fillOpacity: 0.4,
    fillOpacityHover: 0.1,
    strokeOpacity: 0.6,
    strokeOpacityHover: 0.3
}

const MapComponent = Vue.component("map-view", {
    props: [],
    template: "#map-template",

    data:  function(){
        return {
            map: null,
            svg: null,
            ancestry_data: null
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
            this.ancestry_data = mapJson.areas.sort((a, b) => b.prediction - a.prediction)
        } else {
            this.ancestry_data = mapJson.sort((a, b) => b.prediction - a.prediction)     
        }

        this.fillMap()
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
            svg = L.svg({clickable: true}).addTo(map);
            

            const overlay = d3.select(map.getPanes().overlayPane)
            overlay.select('svg').attr("pointer-events", "auto")    
            this.map = map
            this.svg = svg

            

        },
        fillMap: function(){
            // iterate over the reverse order so the greater values of prediction stay on the top of the map
            this.ancestry_data.slice().reverse().forEach( d => {
                let coords = turf.polygonSmooth(turf.polygon(d.region), {iterations: 8})
                
                var polyline = L.geoJson(coords, 
                                            {
                                                color: d.color, 
                                                fillOpacity:    optionsGeoJson.fillOpacity, 
                                                strokeOpacity:  optionsGeoJson.strokeOpacity
                                            }
                                        ).addTo(this.map);

                polyline.bindTooltip(d.name)
              })

            d3.selectAll('path.leaflet-interactive')
              .data(this.ancestry_data.slice().reverse())
              .join('path.leaflet-interactive')
                .on('mouseover', function(e){
                        d3.selectAll('path')
                            .style('fill-opacity', optionsGeoJson.fillOpacityHover)
                            .style('stroke-opacity', optionsGeoJson.strokeOpacityHover)
                        d3.select(this).style('fill-opacity', optionsGeoJson.fillOpacity)
                        d3.select(this).style('stroke-opacity', optionsGeoJson.strokeOpacity)
                })
                .on('mouseout', function(e){
                    d3.selectAll('path')
                            .style('fill-opacity', optionsGeoJson.fillOpacity)
                            .style('stroke-opacity', optionsGeoJson.strokeOpacity)
                })
        },
        selectRegion: function(e){
            let name;
            if(e.target.querySelector(".name-region")){
                name = e.target.querySelector(".name-region").innerHTML
            } else {
                name = e.target.innerHTML
            }

            console.log(name)
            
            d3.selectAll('path.leaflet-interactive')
                .style('stroke-opacity', function(d){
                    if(d.name != name) return optionsGeoJson.strokeOpacityHover
                })
                .style('fill-opacity', function(d){
                    if(d.name != name) return optionsGeoJson.fillOpacityHover
                })
        },
        clearRegion: function(e){
            d3.selectAll('path.leaflet-interactive')
            .style('fill-opacity', optionsGeoJson.fillOpacity)
            .style('stroke-opacity', optionsGeoJson.strokeOpacity)
        },
        percent: function(number){
            return Math.ceil(100*number)+'%'
        }
    }

})