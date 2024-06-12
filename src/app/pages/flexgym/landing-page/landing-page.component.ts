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
  sampleEquipmentText: string = "";
  sampleEquipmentTexts: string[] = [
    "Commercial gym",
    "Dumbells",
    "jump rope",
    "barbell",
    "bike",
    "treadmill",
    "elliptical",
    "yoga mat",
    "Pull Up bar",
    "Squat Rack",
    "Rowing Machine"
  ];

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
    this.sampleEquipmentText = this.sampleEquipmentTexts[Math.floor(Math.random() * this.sampleEquipmentTexts.length)]
  }
  maxLengthCheck(object: any){
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }

  checkEquipmentText() {
    const maxLength = 20;


    if (this.equipmentTextOne.length > maxLength) {
      this.moreTextOneBool = true;
      this.equipmentTextTwo = this.equipmentTextOne.slice(maxLength - 1) + this.equipmentTextTwo;
      this.equipmentTextOne = this.equipmentTextOne.slice(0, maxLength - 1);
      setTimeout(() => {
        document.getElementById("more-equipment-1")?.focus();
      });
    }
    if(this.equipmentTextTwo.length == 0){
      this.moreTextOneBool = false;
      setTimeout(() => {
        document.getElementById("more-equipment-1")?.focus();
      });
    }

    if (this.equipmentTextTwo.length > maxLength) {
      this.moreTextTwoBool = true;
      this.equipmentTextThree = this.equipmentTextTwo.slice(maxLength - 1) + this.equipmentTextThree;
      this.equipmentTextTwo = this.equipmentTextTwo.slice(0, maxLength - 1);
      setTimeout(() => {
        document.getElementById("more-equipment-2")?.focus();
      });
    }
    
    if(this.equipmentTextThree.length == 0){
      this.moreTextTwoBool = false;
      setTimeout(() => {
        document.getElementById("more-equipment-2")?.focus();
      });
    }

    if (this.moreTextTwoBool && this.equipmentTextThree.length > maxLength) {
      this.equipmentTextThree = this.equipmentTextThree.slice(0, maxLength);
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
    console.log(duration);
    let goal: string = goalInput.value;
    let allEquipment: string = this.equipmentTextOne + " " + this.equipmentTextTwo + " " + this.equipmentTextThree;
    if(allEquipment.length <= 2){
      allEquipment = "nothing";
    }
    // math department: 847 635 1688
    // a167 chinese school need help with zoom
    // send to next page
    let currentUrl = window.location.href.split('?')[0]; // Get current URL without query params
    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    this.redirectUrl = `${currentUrl}/liftware/results?a=${age}&b=${weight}&c=${frequency}&d=${duration}&e=${goal}&f=${allEquipment}`;
  }
}
