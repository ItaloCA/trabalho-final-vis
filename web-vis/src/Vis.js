import logo from './logo.svg';
import './App.css';
import React from 'react';
import * as d3 from 'd3';
import * as vl from 'vega-lite-api';

const sinistros2019 = d3.csvParse("public/data/dadosabertos_sinistros_2019.csv")

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


const ExemploVis = () => {
    const topo = JSON.parse("public/data/nz-topo.json");
        
    const map = vl.markGeoshape({fill: '#ddd', stroke: '#fff', strokeWidth: 1})
    .data(vl.topojson(topo).feature('nzl_subunits'));
    
    console.log(map.width(890).height(500).toSpec())
    return map.width(890).height(500).render();
}
    

const Vis = () => {
  return (
    <React.Fragment>
        <div>
            <p>         
                screenWidth= {width}
            </p>
        </div>
        <div>
            {ExemploVis()}
        </div>
        <p>aaa</p>
    </React.Fragment>
  );
}

export default Vis;
