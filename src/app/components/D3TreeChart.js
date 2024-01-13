"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import flareData from "../../../public/flare.json";

function D3TreeChart() {
  const ref = useRef();

  useEffect(() => {
    // Create the chart
    const svgElement = createChart(flareData);
  
    // Append the created chart to the ref element
    ref.current && ref.current.appendChild(svgElement);
  
    // Optional: Cleanup on unmount
    return () => {
      if (ref.current && svgElement && ref.current.contains(svgElement)) {
        ref.current.removeChild(svgElement);
      }
    };
  }, []);    

  return <div ref={ref}></div>;
}

function createChart(data) {
  const width = 1500;
  const root = d3.hierarchy(data);
  const dx = 20;
  const dy = width / (root.height + 1);
  const tree = d3.tree().nodeSize([dx, dy]);
  root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
  tree(root);   

  root.descendants().forEach((d) => {
    d._children = d.children;
    if (d.depth > 0) d.children = null;
  });

  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const height = x1 - x0 + dx * 2;

  const zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom)
      .attr("viewBox", [-dy / 3, x0 - dx, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 15px sans-serif;");

  const g = svg.append("g");

  const linkSelection = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path");

  const nodeSelection = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g");

  function update(source) {
    const nodes = root.descendants().filter(d => d.depth === 0 || d.parent === source.parent || d.parent === source);
    const links = root.links().filter(l => l.source.depth === 0 || l.source === source.parent || l.source === source);

    const nodeUpdate = nodeSelection.data(nodes, d => d.id)
      .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", click);

    nodeUpdate.selectAll('circle').data(d => [d])
      .join("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    nodeUpdate.selectAll('text').data(d => [d])
      .join("text")
        .attr("dy", "1em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .style("fill", "white")  // Set text color to white
        .text(d => d.data.name);

    const linkUpdate = linkSelection.data(links, d => d.target.id)
      .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));
  }

  function click(event, d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }

  update(root);

  return svg.node();
}

export default D3TreeChart;
