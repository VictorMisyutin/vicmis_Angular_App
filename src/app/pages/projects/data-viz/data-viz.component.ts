import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-viz',
  templateUrl: './data-viz.component.html',
  styleUrl: './data-viz.component.css'
})
export class DataVizComponent implements OnInit {
  data: any[] = []; // Initialize the data array
  years: string[] = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2011"];
  ethnicities: string[] = ["all", "White Non Hispanic", "Hispanic", "BLACK NON HISPANIC", "ASIAN AND PACIFIC ISLANDER"]
  selectedYear: string = "2011";
  selectedEthnicity: string = "all";
  selectedGender: string = "both"
  count: string = "30";
  groupGender: boolean = false;
  groupEthnicities: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const params = `year=${this.selectedYear}&ethnicity=${this.selectedEthnicity}&gender=${this.selectedGender}&count=${this.count}&group_genders=${this.groupGender? "true" : "false"}&group_ethnicities=${this.groupEthnicities? "true" : "false"}&quantity=${this.count}`
    console.log(params);

    this.apiService.getBabyNames(params).subscribe(
      (data: any) => {
        this.data = data;
        console.log(data);
        this.renderTable();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getBabyNamesByYear(year: string): Observable<any> {
    return this.apiService.getBabyNames(`?year=${year}`);
  }
  
  renderTable(): void {
    const tableSelection = d3.select('.main-table')
      .selectAll('div')
      .data(this.data)
      .join('div')
      .style('display', 'grid')
      .style('grid-template-columns', '0.1fr 1fr')
      .style('margin-bottom', '0.5vh');

    tableSelection.each(function(d) {
      const row = d3.select(this);

      // Append the left-stuff div for text
      row.append('div')
        .attr('class', 'left-stuff')
        .append('div')
        .text(`${d.name}, ${d.ethnicity}`)
        .style('margin-right', '0.5vw')
        .style('white-space', 'nowrap')
        .style('text-align', 'right')
        .style('font-size', '14px')
        .style('width', '275px');

      // Append the right-stuff div for the bar
      const barContainer = row.append('div')
        .attr('class', 'right-stuff')
        .style('justify-self', 'start');

      // Append the tooltip
      const tooltip = barContainer.append('div')
        .attr('class', 'tooltip')
        .text(`${d.name}, ${d.ethnicity}, ${d.gender}, ${d.count}`)
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('padding', '5px')
        .style('border-radius', '3px')
        .style('color', 'black')
        .style('visibility', 'hidden');

      // Append the bar
      const bar = barContainer.append('div')
        .style('width', `${Number(d.count)}px`)
        .style('height', '10px')
        .style('background-color', '#848484')
        .style('border-radius', '10px')
        .style('background-color', d.gender === 'MALE' ? '#00AAAA' : '#FFC0CB')
        .style('border', '2px black solid')
        .style('cursor', 'default')
        .style('padding', '2px 10px')
        .on('mouseover', function(event) {
          d3.select(this)
            .style('width', `${Number(d.count)}px`)
            .style('height', '12px')
            .style('cursor', 'pointer');

          // Show and position the tooltip
          tooltip.style('visibility', 'visible')
            .style('top', `${event.pageY - 40}px`)
            .style('left', `${event.pageX}px`);
        })
        .on('mousemove', function(event) {
          tooltip.style('top', `${event.pageY - 40}px`)
            .style('left', `${event.pageX}px`);
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('width', `${Number(d.Streams) / 105000}px`)
            .style('height', '10px');

          tooltip.style('visibility', 'hidden');
        });
    });
  }


  validateCount(event: Event) {
    this.maxLengthCheck(event.target);
    const target = event.target as HTMLInputElement;
    let num = 0;
    if(target.value != '') num = parseInt(target.value);   
  }
  maxLengthCheck(object: any){
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }

  selectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedYear = selectElement.value;
    this.fetchData();
  }

  onEthnicityChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedEthnicity = selectElement.value;
    this.fetchData();
  }

  onGenderChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedGender = selectElement.value;
    this.fetchData();
  }

  onGroupGenderChange(event: Event) {
    const checkboxElement = event.target as HTMLInputElement;
    this.groupGender = checkboxElement.checked;
    this.fetchData();
  }

  onGroupEthnicitiesChange(event: Event) {
    const checkboxElement = event.target as HTMLInputElement;
    this.groupEthnicities = checkboxElement.checked;
    this.fetchData();
  }

}
