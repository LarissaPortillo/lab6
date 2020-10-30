function AreaChart(container){

    // initialization
    const margin = ({top: 10, right: 10, bottom: 20, left: 40});
  
    const width = 500-margin.left-margin.right, height = 400-margin.top - margin.bottom;
    
    const svg = d3.select(container)
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

    xScale = d3.scaleTime()  
     .range([0, width]);    
  
    yScale = d3.scaleLinear()       
      .range([height, 0]);

   
     

    svg.append("g")
      .attr("class", "y-axis");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`);
    
    
   

	function update(data){ 

		// (use the total count)
        //update scales
        xScale.domain([d3.min(data,d =>{return d.date;}),d3.max(data,d=>{return d.date;}) ]);
        yScale.domain([0,d3.max(data,d=>{return d.total})]);
        

        //update encodings

        const area= d3.area()
        .defined(d=>{return d.total >=0;})
        .x(d=>{return xScale(d.date);})
        .y0(d=>{return yScale.range()[0];})
        .y1(d=>{return yScale(d.total);});

        svg.append("path")
        .datum(data)
        .attr("class","area")
        .attr("d",area);
        
        //update axes
        const xAxis = d3.axisBottom(xScale);

        const yAxis = d3.axisLeft(yScale);
        
        svg.select(".x-axis")
        .call(xAxis);
    
        svg.select(".y-axis")
        .call(yAxis);

  
	}

	return {
		update // ES6 shorthand for "update": update
	};
}





function StackedAreaChart(container) {
	// initialization
    const margin = ({top: 10, right: 10, bottom: 20, left: 40});
  
    const width = 500-margin.left-margin.right, height = 400-margin.top - margin.bottom;
    
    const svg = d3.select(container)
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

    xScale = d3.scaleTime()  
     .range([0, width]);    
  
    yScale = d3.scaleLinear()       
      .range([height, 0]);

    color = d3.scaleOrdinal()
      .range(d3.schemeCategory10);
    

    const tooltip = svg
      .append("text")
      .attr("text-anchor", "start")
      .attr("font-size", 13)
      .attr("x",10)
      .attr("y",0);

    svg.append("g")
      .attr("class", "y-axis");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`);
    

	function update(data){

        const k=data.columns.slice(1);
        const stack=d3.stack()
            .keys(k)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);
        
        const stackedData=stack(data);
        console.log("stacked",stackedData);
        
        color.domain(k);
        yScale.domain([0,d3.max(stackedData,d=> d3.max(d,d=>d[1]))]);
        xScale.domain(d3.extent(data, d=>d.date));
        
        const area=d3.area()
            .x(d => xScale(d.data.date))
            .y0(d => yScale(d[0]))
            .y1(d => yScale(d[1]));
        
        const areas = svg.selectAll(".area")
            .data(stackedData, d => d.key);
            
        areas.enter() 
            .append("path")
            .merge(areas)
            .attr("d", area)
            .attr("fill",d=>{
                return color(d.key);
            })
            .on("mouseover", (event, d, i) => tooltip.text(d.key))
            .on("mouseout", (event, d, i) => tooltip.text(""));
        
        
        areas.exit().remove();
        
        const xAxis = d3.axisBottom(xScale);

        const yAxis = d3.axisLeft(yScale);
        
        svg.select(".x-axis")
        .call(xAxis);
    
        svg.select(".y-axis")
        .call(yAxis);
        
	}
	return {
		update
	}
}



d3.csv('https://cdn.glitch.com/ee969b39-5890-4207-8b9e-31577b0b6838%2Funemployment.csv?v=1603583788416', d=>{
    return{
        ...d,
        date: new Date(d.date),
        "Wholesale and Retail Trade":+d["Wholesale and Retail Trade"],
        Manufacturing: +d.Manufacturing,
        "Leisure and hospitality": +d["Leisure and hospitality"],
        "Business services":+d["Business services"],
        Construction: +d.Construction,
        "Education and Health": +d["Education and Health"],
        Government:+d.Government,
        Finance:+ d.Finance,
        "Self-employed":+d["Self-employed"],
        Other: +d.Other,
        "Transportation and Utilities":+d["Transportation and Utilities"],
        Information:+ d.Information,
        Agriculture: +d.Agriculture,
        "Mining and Extraction":+d["Mining and Extraction"],
        total: +(
            +d["Wholesale and Retail Trade"]
            + +d.Manufacturing
            + +d["Leisure and hospitality"]
            + +d["Business services"]
            + +d.Construction
            + +d["Education and Health"]
            + +d.Government
            + +d.Finance
            + +d["Self-employed"]
            + +d.Other
            + +d["Transportation and Utilities"]
            + +d.Information
            + +d.Agriculture
            + +d["Mining and Extraction"]
        )
    }
} )
.then(data=>{
    data=data;
    console.log("data",data);
   const c = StackedAreaChart("body");
   c.update(data);



})




