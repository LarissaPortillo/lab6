d3.csv('https://cdn.glitch.com/ee969b39-5890-4207-8b9e-31577b0b6838%2Funemployment.csv?v=1603583788416', d3.autoType)
.then(data=>{
  
  data=data;
  
  console.log("data",data);
  
  let total = data.row(function(d) { 
        const total = 0;
        for (var o in d) {
          if (o === "date") continue;
          else total += +d[o];
        }
        return {
          date: d.date, 
          "Wholesale and Retail Trade": d["Wholesale and Retail Trade"],
          "Manufacturing":d.Manufacturing,
          "Leisure and hospitality":d["Leisure and hospitality"],
          "Business services": d["Business services"],
          "Construction":d.Construction,
          "Education and Health":d["Education and Health"],
          Government:d.Government,
          Finance:d.Finance,
          "Self-employed":d["Self-employed"],
          Other:d.Other,
          Transportation:d.Transportation,
          Information:d.Information,
          Agriculture:d.Agriculture,
          "Mining and Extraction":d["Mining and Extraction"],
          total: total
        };
      })
//((+d.v) + (+d.Manufacturing) + (+d.Leisure) + (+d.Business)+ (+d.Construction)+ (+d.Education)+ (+d.Government) + (+d.Finance) + (+d.Self)+ (+d.Other)+ (+d.Transportation)+ (+d.Information)+ (+d.Agriculture)+ (+d.Mining)) ; })
  
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


  