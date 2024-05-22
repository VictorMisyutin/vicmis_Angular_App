import { Component } from '@angular/core';

@Component({
  selector: 'app-create-connections',
  templateUrl: './create-connections.component.html',
  styleUrl: './create-connections.component.css'
})
export class CreateConnectionsComponent {
  
  shareURL:string = ""; 

  // encrypt each character into three digit unicode
  encrypt(key: string){
    let hash: string = "";
    if(key.length == 0) return hash;
    
    let code: string = "";
    for(let i = 0; i < key.length; i++){
      code = key.charCodeAt(i).toString();
      if (code.length == 2){
        code = "0"+code;
      }
      hash += code;
    }

    return hash;
  }

  createGame(){
    // get all categories and answers
    let yellowCategory: string = "";
    let greenCategory: string = "";
    let blueCategory: string = "";
    let purpleCategory: string = "";
    let yellowAnswers: string = "";
    let greenAnswers: string = "";
    let blueAnswers: string = "";
    let purpleAnswers: string = "";

    let yellowCategoryElement = document.getElementById("yellow-category") as HTMLInputElement;
    let yellowAnswerOne = document.getElementById("yellow-answer-one") as HTMLInputElement;
    let yellowAnswerTwo = document.getElementById("yellow-answer-two") as HTMLInputElement;
    let yellowAnswerThree = document.getElementById("yellow-answer-three") as HTMLInputElement;
    let yellowAnswerFour = document.getElementById("yellow-answer-four") as HTMLInputElement;
    yellowAnswers = yellowAnswerOne.value + ", " + yellowAnswerTwo.value + ", " + yellowAnswerThree.value + ", " + yellowAnswerFour.value;
    yellowAnswers.replace(/\s*,\s*/g, ',');

    let greenCategoryElement = document.getElementById("green-category") as HTMLInputElement;
    let greenAnswerOne = document.getElementById("green-answer-one") as HTMLInputElement;
    let greenAnswerTwo = document.getElementById("green-answer-two") as HTMLInputElement;
    let greenAnswerThree = document.getElementById("green-answer-three") as HTMLInputElement;
    let greenAnswerFour = document.getElementById("green-answer-four") as HTMLInputElement;
    greenAnswers = greenAnswerOne.value + ", " + greenAnswerTwo.value + ", " + greenAnswerThree.value + ", " + greenAnswerFour.value;
    greenAnswers.replace(/\s*,\s*/g, ',');

    let blueCategoryElement = document.getElementById("blue-category") as HTMLInputElement;
    let blueAnswerOne = document.getElementById("blue-answer-one") as HTMLInputElement;
    let blueAnswerTwo = document.getElementById("blue-answer-two") as HTMLInputElement;
    let blueAnswerThree = document.getElementById("blue-answer-three") as HTMLInputElement;
    let blueAnswerFour = document.getElementById("blue-answer-four") as HTMLInputElement;
    blueAnswers = blueAnswerOne.value + ", " + blueAnswerTwo.value + ", " + blueAnswerThree.value + ", " + blueAnswerFour.value;
    blueAnswers.replace(/\s*,\s*/g, ',');

    let purpleCategoryElement = document.getElementById("purple-category") as HTMLInputElement;
    let purpleAnswerOne = document.getElementById("purple-answer-one") as HTMLInputElement;
    let purpleAnswerTwo = document.getElementById("purple-answer-two") as HTMLInputElement;
    let purpleAnswerThree = document.getElementById("purple-answer-three") as HTMLInputElement;
    let purpleAnswerFour = document.getElementById("purple-answer-four") as HTMLInputElement;
    purpleAnswers = purpleAnswerOne.value + ", " + purpleAnswerTwo.value + ", " + purpleAnswerThree.value + ", " + purpleAnswerFour.value;
    purpleAnswers.replace(/\s*,\s*/g, ',');

    yellowCategory = this.encrypt(yellowCategoryElement.value.trim());
    greenCategory = this.encrypt(greenCategoryElement.value.trim());
    blueCategory = this.encrypt(blueCategoryElement.value.trim());
    purpleCategory = this.encrypt(purpleCategoryElement.value.trim());

    yellowAnswers = this.encrypt(yellowAnswers);
    greenAnswers = this.encrypt(greenAnswers);
    blueAnswers = this.encrypt(blueAnswers);
    purpleAnswers = this.encrypt(purpleAnswers);
    // encode into url
    let currentUrl = window.location.href.split('?')[0]; // Get current URL without query params
    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    this.shareURL = `${currentUrl}?a=${yellowCategory}&b=${greenCategory}&c=${blueCategory}&d=${purpleCategory}&e=${yellowAnswers}&f=${greenAnswers}&g=${blueAnswers}&h=${purpleAnswers}`;
    document.getElementById('url-display')?.classList.remove('URL-hidden');
    document.getElementById('url-display')?.classList.add('URL-show');
  }
  copyLink(){

    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.shareURL)
        .then(() => {
          alert('Text copied to clipboard');
        })
        .catch(err => {
          alert('Error copying text: ');
        });
    } else {
      alert('Clipboard API not supported');
    }
  }

}
