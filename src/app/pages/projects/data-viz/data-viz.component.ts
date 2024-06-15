import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-data-viz',
  templateUrl: './data-viz.component.html',
  styleUrl: './data-viz.component.css'
})
export class DataVizComponent implements OnInit {

  constructor(private apiService: ApiService){}
  
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
    let getThing = this.apiService.getBabyNamesByYear("2011");
    getThing.subscribe(data => {
      console.log(data);
    });

    d3.select(".main-table")
      .selectAll("div")
      .data(this.data)
      .join("div")
      .style("display", "grid")
      .style("grid-template-columns", "0.1fr 1fr")
      .style("margin-bottom", "0.5vh")
      .each(function(d) {
        // Append the left-stuff div for text
        d3.select(this).append("div")
          .attr("class", "left-stuff")
          .append("div")
          .text(`${d.Song}, ${d['Artist(s)']}`)
          .style("margin-right", "0.5vw") // Space between text and bar
          .style("white-space", "nowrap") // Prevent text wrapping
          .style("text-align", "right") // Corrected 'text-align'
          .style("font-size", "14px")
          .style("width", "275px");
  
        // Append the right-stuff div for the bar
        const barContainer = d3.select(this).append("div")
          .attr("class", "right-stuff")
          .style("justify-self", "start");  // Aligns the right-stuff div content to the left
        
        // Append the tooltip
        const tooltip = barContainer.append("div")
          .attr("class", "tooltip")
          .text(`${d.Song}, ${d['Artist(s)']}: ${d.Streams} Streams`)
          .style("position", "absolute")
          .style("background-color", "white")
          .style("border", "1px solid black")
          .style("padding", "5px")
          .style("border-radius", "3px")
          .style("color", "black")
          .style("visibility", "hidden");  // Initially hidden
  
        // Append the bar
        const bar = barContainer.append("div")
          .style("width", `${Number(d.Streams) / 105000}px`)
          .style("height", "10px")
          .style("background-color", "#848484")
          .style("border-radius", "10px")
          .style("border", "2px black solid")
          .style("cursor", "default")
          .style("padding", "2px 10px")
          .on('mouseover', function (event) {
            d3.select(this)
              .style("width", `${Number(d.Streams) / 103000}px`)
              .style("height", "12px")
              .style("background-color", "#335588")
              .style("cursor", "pointer");
  
            // Show and position the tooltip
            tooltip.style("visibility", "visible")
              .style("top", `${event.pageY - 40}px`)
              .style("left", `${event.pageX}px`);
          })
          .on('mousemove', function (event) {
            // Update tooltip position on mouse move
            tooltip.style("top", `${event.pageY - 40}px`)
              .style("left", `${event.pageX}px`);
          })
          .on('mouseout', function (event) {
            d3.select(this)
              .style("width", `${Number(d.Streams) / 105000}px`)
              .style("background-color", "#848484")
              .style("height", "10px");
  
            // Hide the tooltip
            tooltip.style("visibility", "hidden");
          });
      });
  }
  
  sortByYear(){

  }
  
  sortByName(){

  }
  
  sortByEthnicity(){

  }

  sortByGender(){

  }

}
