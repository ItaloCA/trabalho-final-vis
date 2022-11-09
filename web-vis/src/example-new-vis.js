import './App.css';
import React from 'react';
import * as d3 from 'd3';
import {csv} from 'd3-request';
import * as vl from 'vega-lite-api';
import vegaEmbed from 'vega-embed';
import CSVReader from "react-csv-reader";

 

let newExampleVis = () => {
    const topo = d3.csv("../public/data/chicagoNeighborhoods.csv", (data)=>{})
    const crimes = d3.csv("../public/data/crimes_chicago_2022_august@1.csv", (data)=>{})
    console.log(crimes)
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    let brush = vl.selectInterval().name('brush').encodings('x').resolve('intersect')


    const map = () => {

        const coastmap = vl.markGeoshape({
          fill: '#ddd', 
          stroke: '#fff', 
          strokeWidth: 1
        })
          .data(vl.topojson(topo).feature('chicago_neighborhoods'))
      
      
          const circles = vl.markCircle(
          {
            fillOpacity: 0.95,
            stroke: '#6d6d6d',
            strokeWidth: 1,
            strokeOpacity: 0.7
          }
        )
        .data(crimes)
        .encode(
          vl.latitude().fieldQ('Latitude'),
          vl.longitude().fieldQ('Longitude'),
          vl.color().fieldN('Primary Type')
            .scale({
              domain: ['BURGLARY', 'HOMICIDE', 'ROBBERY'],
              range: ['#ffd701', '#ff2200', '#3c72d6']
            })
            .legend({title: 'Crime Type'}),
        
         vl.tooltip([{field: 'Primary Type', type: 'string', title: "Crime Type"},
                     {field: 'Date', type: 'temporal', format: d3.timeFormatLocale['dateTime'], title: "Day"},
                     {field: 'Date', type: 'temporal', format: "%H:%M:%S", title: "Hour"}
                     
                    ])
        )
          
      
        return vl.layer(
          coastmap,
          circles.transform(vl.filter(brush))
        )
          .width(width*0.45)
          .height(500)  
       //.render()
      
    };

    const crimesByTypeChart = vl.markBar()
      .encode(
        vl.x().fieldN('Primary Type').title("Primary Type"),
        vl.y().count().title(null),
        vl.color().fieldN('Primary Type')
        .scale({
          domain: ['BURGLARY', 'HOMICIDE', 'ROBBERY'],
          range: ['#ffd701', '#ff2200', '#3c72d6']
        })
        .legend({title: 'Crime Type'})
      )
  
  
    const crimesByTypeChartLayer = vl.layer(
      crimesByTypeChart.params(brush).encode(vl.color().value('lightgrey')),
      crimesByTypeChart.transform(vl.filter(brush))
    )
      .data(crimes)
      .title("Number of Crimes by Type")
      .width(width*0.40)
      .height(200)
    
    const crimesByDayChart = vl.markLine()
      .encode(
        vl.x().fieldT('Date').title("Date (month-day)").timeUnit('monthdate'),
        vl.y().count().title(null),
        vl.color().fieldN('Primary Type')
        .scale({
          domain: ['BURGLARY', 'HOMICIDE', 'ROBBERY'],
          range: ['#ffd701', '#ff2200', '#3c72d6']
        })
        .legend({title: 'Crime Type'})
      )
  
  
    const crimesByDayChartLayer = vl.layer(
      crimesByDayChart.encode(vl.color().value('lightgrey')),
      crimesByDayChart.transform(vl.filter(brush))
    )
      .data(crimes)
      .title("Number of Crimes by Day")
      .width(width*0.40)
      .height(150)
  
    //return crimesByDayChart.render()
    return vl.hconcat(map,vl.vconcat(crimesByTypeChartLayer , crimesByDayChartLayer))
      .toSpec()
  };

  export {newExampleVis};