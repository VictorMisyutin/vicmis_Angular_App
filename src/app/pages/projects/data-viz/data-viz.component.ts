import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-viz',
  templateUrl: './data-viz.component.html',
  styleUrl: './data-viz.component.css'
})
export class DataVizComponent implements OnInit {

  // private data = [
  //   {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  //   {"Framework": "React", "Stars": "150793", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  // ];
  
  // private svg: any;
  // private margin = 50;
  // private width = 750 - (this.margin * 2);
  // private height = 400 - (this.margin * 2);
  
  // private createSvg(): void {
  //   this.svg = d3.select("figure#bar")
  //   .append("svg")
  //   .attr("width", this.width + (this.margin * 2))
  //   .attr("height", this.height + (this.margin * 2))
  //   .append("g")
  //   .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  // }
  
  // private drawBars(data: any[]): void {
  //   // Create the X-axis band scale
  //   const x = d3.scaleBand()
  //   .range([0, this.width])
  //   .domain(data.map(d => d.Framework))
  //   .padding(0.2);
  
  //   // Draw the X-axis on the DOM
  //   this.svg.append("g")
  //   .attr("transform", "translate(0," + this.height + ")")
  //   .call(d3.axisBottom(x))
  //   .selectAll("text")
  //   .attr("transform", "translate(-10,0)rotate(-45)")
  //   .style("text-anchor", "end");
  
  //   // Create the Y-axis band scale
  //   const y = d3.scaleLinear()
  //   .domain([0, 200000])
  //   .range([this.height, 0]);
  
  //   // Draw the Y-axis on the DOM
  //   this.svg.append("g")
  //   .call(d3.axisLeft(y));
  
  //   // Create and fill the bars
  //   this.svg.selectAll("bars")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d: any) => x(d.Framework))
  //   .attr("y", (d: any) => y(d.Stars))
  //   .attr("width", x.bandwidth())
  //   .attr("height", (d: any) => this.height - y(d.Stars))
  //   .attr("fill", "#d04a35");
  // }
  
  // ngOnInit(): void {
  //   this.createSvg();
  //   this.drawBars(this.data);
  // }
  
  private data = [
    { "Artist(s)": "Radiohead", "Song": "Karma Police", "Streams": "30000000" },
    { "Artist(s)": "The Beatles", "Song": "Hey Jude", "Streams": "50000000" },
    { "Artist(s)": "Nirvana", "Song": "Smells Like Teen Spirit", "Streams": "45000000" },
    { "Artist(s)": "Adele", "Song": "Rolling in the Deep", "Streams": "60000000" },
    { "Artist(s)": "Ed Sheeran", "Song": "Shape of You", "Streams": "100000000" },
    { "Artist(s)": "Taylor Swift", "Song": "Shake It Off", "Streams": "75000000" },
    { "Artist(s)": "Drake", "Song": "God's Plan", "Streams": "85000000" },
    { "Artist(s)": "Beyoncé", "Song": "Halo", "Streams": "40000000" },
    { "Artist(s)": "Queen", "Song": "Bohemian Rhapsody", "Streams": "80000000" },
    { "Artist(s)": "Eminem", "Song": "Lose Yourself", "Streams": "55000000" }
  ];
  
  ngOnInit(): void {
    d3.select(".main-table")
      .selectAll("div")
      .data(this.data)
      .join("div")
      .style("display", "grid")
      .style("grid-template-columns", "0.1fr 1fr")
      .style("margin-bottom", "10px")
      .each(function(d) {
        // Append the left-stuff div for text
        d3.select(this).append("div")
          .attr("class", "left-stuff")
          .append("div")
          .text(`${d.Song}, ${d['Artist(s)']}`)
          .style("margin-right", "10px") // Space between text and bar
          .style("white-space", "nowrap") // Prevent text wrapping
          .style("text-align", "right") // Corrected 'text-align'
          .style("width", "275px");
  
        // Append the right-stuff div for the bar
        d3.select(this).append("div")
        .attr("class", "right-stuff")
        .style("justify-self", "start")  // Aligns the right-stuff div content to the left
        .append("div")
        .style("width", `${Number(d.Streams) / 105000}px`)
        .style("height", "20px")
        .style("background-color", "#848484")
        .style("border-radius", "10px")
        .style("border", "2px black solid")
        .style("cursor", "default")
        .style("padding", "2px 10px")
          .on('mouseover', function (event) {
            d3.select(this)
              .style("width", `${Number(d.Streams) / 103000}px`)
              .style("height", "22px")
              .style("background-color", "#335588")
              .style("cursor", "pointer");
          })
          .on('mouseout', function (event) {
            d3.select(this)
              .style("width", `${Number(d.Streams) / 105000}px`)
              .style("background-color", "#848484")
              .style("height", "20px");
          });
      });
  }
  
  





}
