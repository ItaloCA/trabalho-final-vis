import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as vl from 'vega-lite-api';
import vegaEmbed from 'vega-embed';
import Papa from 'papaparse';

import * as newVis from './example-new-vis';



const Vis = () => {

    let [showMap, setShowMap] = useState(false);

    const sinistros2019 = d3.csv("public/data/dadosabertos_sinistros_2019.csv")

    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;



    
    const topo = d3.csv("../public/data/chicagoNeighborhoods.csv", (data)=>{})
    const crimes = d3.csv("../public/data/crimes_chicago_2022_august@1.csv", (data)=>{})
    
    Papa.parse('../public/data/chicagoNeighborhoods.csv', {
        complete: function(results) {
            console.log('neig',results);
        }
    });
    Papa.parse("../public/data/crimes_chicago_2022_august@1.csv", {
        complete: function(results) {
            console.log('crimes',results);
        }
    });
    
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
    
    let map = vl.layer(
        coastmap,
        circles
        )
        .width(width*0.45)
        .height(500)
        .toSpec()  

        
//.render()




// let ExemploVis = () => {
    let mySpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    data: {
      values: [
        {a: 'A', b: 28},
        {a: 'B', b: 55},
        {a: 'C', b: 43},
        {a: 'D', b: 91},
        {a: 'E', b: 81},
        {a: 'F', b: 53},
        {a: 'G', b: 19},
        {a: 'H', b: 87},
        {a: 'I', b: 52}
      ]
    },
    mark: 'bar',
    encoding: {
      x: {field: 'a', type: 'ordinal'},
      y: {field: 'b', type: 'quantitative'}
    }
  };
  
//   vegaEmbed('#vis', mySpec)
//   return (<React.Fragment><div id='vis'></div></React.Fragment>)
// };
    
    useEffect(()=>{
        setShowMap(true)
        console.log('map',map)
        console.log('asdadsadsa', topo)
        vegaEmbed('#exVis', map)
    },[map])

    vegaEmbed('#vis', mySpec)
    vegaEmbed('#exVis', map)
    // useEffect(()=>{
    //     console.log(newVis.newExampleVis())
    
    // })
    return (
        <React.Fragment>
            <div>
                <p>         
                    screenWidth= {width}
                </p>
            </div>
            <div id='vis'></div>
            <div id='exVis'></div>
            {/* {ExemploVis()} */}
            

            
            <p>aaa</p>
        </React.Fragment>
    );
}

export default Vis;
