d3.csv('https://cdn.glitch.com/ee969b39-5890-4207-8b9e-31577b0b6838%2Funemployment.csv?v=1603583788416', d3.autoType)
.then(data=>{
  
  data=data;
  
  console.log("data",data);
  
  const total=d3.sum(data);
  console.log("total",total);
  
});

const margin = ({top: 10, right: 10, bottom: 20, left: 40});
  
const width = 500-margin.left-margin.right, height = 400-margin.top - margin.bottom;

const svg = d3.select("body")
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);


  