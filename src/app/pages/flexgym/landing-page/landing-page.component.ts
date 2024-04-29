import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {
  redirectUrl: string = "";
  equipmentTextOne: string = "";
  equipmentTextTwo: string = "";
  equipmentTextThree: string = "";
  moreTextOneBool: boolean = false;
  moreTextTwoBool: boolean = false;
  buttonText: string = "Generate";
  sampleFitnessGoals: string[] = [
    "stay in shape",
    "get a gyat by summer",
    "get abs",
    "make my ex jealous",
    "lose weight",
    "gain muscle",
    "lose 8 pounds in a month",
    "lose belly fat",
    "mog",
    "stop getting mogged",
    "get a better jawline",
    "increase vertical",
    "increase agility",
    "get faster"
  ];

  sampleFitnessGoal: string= "";
  constructor(){
    this.sampleFitnessGoal = this.sampleFitnessGoals[Math.floor(Math.random() * this.sampleFitnessGoals.length)]
  }
  maxLengthCheck(object: any){
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }

  checkEquipmentText() {
    const maxLength = 20;
    let character = '';
    if (this.equipmentTextOne.length >= maxLength) {
      this.equipmentTextTwo = this.equipmentTextOne.slice(-1) + this.equipmentTextTwo;
      this.moreTextOneBool = true;
      this.equipmentTextOne = this.equipmentTextOne.slice(0, -1);
      document.getElementById("more-equipment-1")?.focus();
    }
    if (this.equipmentTextTwo.length >= maxLength) {
      this.equipmentTextThree += this.equipmentTextTwo.slice(-1) + this.equipmentTextThree;
      this.equipmentTextTwo = this.equipmentTextTwo.slice(0, -1);
      this.moreTextTwoBool = true;
      document.getElementById("more-equipment-2")?.focus();
    }
    if(this.moreTextTwoBool){
      if (this.equipmentTextThree.length >= maxLength) {
        this.equipmentTextThree = this.equipmentTextThree.slice(0, -1);
      }
    }
  }

  GrabValues(){
    let ageInput = document.getElementById("age") as HTMLInputElement;
    let weightInput = document.getElementById("weight") as HTMLInputElement;
    let frequencyInput = document.getElementById("frequency") as HTMLInputElement;
    let durationInput = document.getElementById("duration") as HTMLInputElement;
    let goalInput = document.getElementById("goal") as HTMLTextAreaElement;

    // let age: number;
    let age: string = ageInput.value;
    let weight: string = weightInput.value;
    let frequency: string = frequencyInput.value;
    let duration: string = durationInput.value;
    let goal: string = goalInput.value;
    let allEquipment: string = this.equipmentTextOne + " " + this.equipmentTextTwo + " " + this.equipmentTextThree;
    let generateButton = document.getElementById("generate-button-text") as HTMLButtonElement;
    generateButton.innerHTML = "loading...";

    // send to next page
    let currentUrl = window.location.href.split('?')[0]; // Get current URL without query params
    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    this.redirectUrl = `${currentUrl}/liftware/results?a=${age}&b=${weight}&c=${frequency}&d=${duration}&e=${goal}&f=${allEquipment}`;
  }
}
