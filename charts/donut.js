function newDonut(div) {
    donut = new ApexCharts(document.getElementById(div), {
        chart: {
            id: "my-donut",
            type: "donut",
            fontFamily: 'inherit',
            height: '100%',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        fill: {
            opacity: 1,
        },
        series: [],
        labels: [],
        grid: {
            strokeDashArray: 4,
        },
        colors: ["#206bc4", "#79a6dc", "#d2e1f3", "#e9ecf1"],
        legend: {
            show: true,
            position: 'bottom',
            offsetY: 12,
            markers: {
                width: 10,
                height: 10,
                radius: 100,
            },
            itemMargin: {
                horizontal: 8,
                vertical: 8
            },
        },
        tooltip: {
            fillSeriesColor: false
        },
    }).render();
}

function updateDonut(id, data){
    ApexCharts.exec(id, 'updateSeries', 
        getSeriesDonut(data)
    , true)


    ApexCharts.exec(id, 'updateOptions',  
        {
            'labels': getLabelsDonut(data)
        }
    , true)
}

function getSeriesDonut(data){
    return data.map(item =>  item.value)
}

function getLabelsDonut(data){
    return data.map(item => item.label)
}

