function init() {
       
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    
    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
      
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option").text(id).property("value",id);
        });
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        
        buildGaugeChart(sample_one);

    });
};
init();

function buildGaugeChart(BellyButton) {

    d3.json(url).then((data)=> {
    
        let metadata =data.metadata.filter(sampleid=>sampleid.id == BellyButton);
        console.log(metadata)
        let metadata_area=metadata[0];
        
        //locate the wash frequency array in the metadata array
        let washFrequency = Object.values(metadata_area)[6];
        
        // Set up the trace for the gauge chart
        let wfreq = {
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 0, 0, 0.9)"},
                    {range: [1, 2], color: "rgba(225, 50 , 200, .9)"},
                    {range: [2, 3], color: "rgba(195, 75, 175, .9)"},
                    {range: [3, 4], color:  "rgba(165, 100, 150, .9)"},
                    {range: [4, 5], color:  "rgba(135, 50, 250, .9)"},
                    {range: [5, 6], color: "rgba(105, 100, 200, .9)"},
                    {range: [6, 7], color: "rgba(75, 150, 175, .9)"},
                    {range: [7, 8], color:  "rgba(45, 200, 150, .9)"},
                    {range: [8, 9], color: "rgba(20, 225, 125, 0.9)"},
                    {range: [9, 10], color: "rgba(0, 255, 0, .9)"},
                ]
            } 
        };

        // Set up the Layout
        let layout = {
            width: 400, 
            height: 400,
            margin: {t: 0, b:0}
        };

        // Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [wfreq], layout)
    });
};
function optionChanged(sample) { 

    // Log the new value
    console.log(sample); 

    // Call all functions 
    
    buildGaugeChart(sample);
};