'user strict'
//hide the graph div and show the map div
function closeAssetData() {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: false, show: false
    });
    bsMapCollapse.show();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
        toggle: false, show: true
    });
    bsAdwCollapse.hide();

}
// show the DIV when the 'Show graph' menu is clicked
function loadGraph() {
    let mapCollapse = document.getElementById('mapWrapper');
    let bsMapCollapse = new bootstrap.Collapse(mapCollapse, {
        toggle: false,
        show: false
    });
    bsMapCollapse.hide();
    let adwCollapse = document.getElementById('assetDataWrapperWrapper');
    let bsAdwCollapse = new bootstrap.Collapse(adwCollapse, {
        toggle: false,
        show: true
    });
    bsAdwCollapse.show();
    // show graph
    // the following code is added to dynamically size the graph DIV
    //create the SVG component to actually store the graph
    let widtha = document.getElementById("assetDataWrapper").clientWidth;
    let heighta = document.getElementById("assetDataWrapper").offsetHeight;
    console.log(widtha + " " + heighta);
    // Add the close button and an SVG element for the graph

    document.getElementById("assetDataWrapper").innerHTML = `<div class="h-100 w100">
 <button type="button" class="btn-close float-end" arialabel="Close" onclick="closeAssetData()"></button>
 <svg fill="blue" width="`+ widtha + `" height="` + heighta + `" id="svg1">
 </svg>
 </div>`
    // code to create the graph goes here – see below
    createGraph();
}
// create the graph
function createGraph() {
    // create an SVG container for the graph
    // g is a grouping element
    let marginTop = 30;
    let marginBottom = 60;
    let marginLeft = 50;
    let marginRight = 20;

    //let dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    let dataURL = baseComputerAddress + '/api/geojson/dailyParticipationRates';
    // download the data and create the graph
    d3.json(dataURL).then(data => {
        data = data[0].array_to_json;
        // construct the json in order of weekdays

        const mapping = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }

        const weekdays = [];

        for (let i = 0; i < data.length; i++) {
            weekdays[mapping[data[i].day]] = data[i]
        }

        console.log(weekdays);
        console.log(data);
        data = weekdays;

        // loop through the data and get the length of the x axis titles
        let xLen = 0;
        data.forEach(feature => {

            if (xLen < feature.day.length) {
                xLen = feature.day.length;
            }
            console.log(xLen);

        });

        // adjust the space available for the x-axis titles, depending on the length of the text
        if (xLen > 100) {
            marginBottom = Math.round(xLen / 3, 0);
        }
        else {
            marginBottom = xLen + 20;  // the 20 allows for the close button 
        } //rough approximation for now
        console.log(marginBottom);
        let svg = d3.select("#svg1"),
            margin = {
                top: marginTop,
                right: marginRight,
                bottom: marginBottom,
                left: marginLeft
            },
            width = svg.attr("width") - marginLeft - marginRight,
            height = svg.attr("height") - marginTop - marginBottom,
            x = d3.scaleBand().rangeRound([0, width]).padding(0.2), //scaleband: set up a scale for ordinal data
            y = d3.scaleLinear().rangeRound([height, 0]),   //scaleLinear: scale for continuous numerical data
            g = svg.append("g") //used in svg as a group/container for other graphic elements, in this case the container is tranformed to the top left of the page
                .attr("transform", `translate(${margin.left},${margin.top})`);



        x.domain(data.map(d => d.day));
        y.domain([0, d3.max(data, d => d.reports_submitted)]);

        // adapted from: https://bl.ocks.org/mbostock/7555321 10th March 2021/
        g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll(".tick text")
            .call(wrap, x.bandwidth());


        g.append("g")
            .attr("class", "axis axis-y")
            .call(d3.axisLeft(y).ticks(10).tickSize(8));

        g.selectAll(".bar1")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar1")
            .attr("x", d => x(d.day))
            .attr("y", d => y(d.reports_submitted))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => y(0) - y(d.reports_submitted))
            .attr("fill", "steelblue");

        //add another bar to show the reports 
        g.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", d => x(d.day) + x.bandwidth() / 2)
            .attr("y", d => y(d.reports_not_working))
            .attr("width", x.bandwidth() / 2)
            .attr("height", d => height - y(d.reports_not_working))
            .attr("fill", "orange");
        // add legend for the graph
        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(["Reports Submitted in total", "Reports submitted with worst condition values"])
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", (d, i) => i === 0 ? "steelblue" : "orange");

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);

    })
        .catch(err => {
            let svg = d3.select('#svg1');
            svg.append("text")
                .attr("y", 20)
                .attr("text-anchor", "left")
                .style("font-size", "10px")
                .style("font-weight", "bold")
                .text(`Couldn't open the data file: "${err}".`);
        });


}


// separate function to wrap the legend entries
// in particular if the place name where the earthquake happened is long
function wrap(text, width) {
    text.each(function () {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

