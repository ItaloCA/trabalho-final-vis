import logo from './logo.svg';
import './App.css';
import React from 'react';
import * as d3 from 'https://cdn.skypack.dev/d3@7';
import * as vl from 'vega-lite-api';

const sinistros2019 = d3.csvParse("public/data/dadosabertos_sinistros_2019.csv")

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


// const map = vl.markGeoshape({fill: '#ddd', stroke: '#fff', strokeWidth: 1})
//   .data(vl.topojson(topo).feature('nzl_subunits'))


const Vis = () => {
  return (
    <React.Fragment>
        <div>
            afsfdasf
            screenWidth= {width}
            
        </div>
        <div>
            {/* {map.width(width*0.45)
    .height(500).render()} */}
        </div>
    </React.Fragment>
  );
}

export default Vis;
