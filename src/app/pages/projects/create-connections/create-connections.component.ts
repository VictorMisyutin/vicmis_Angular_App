import { Component, ViewChildren, QueryList, ElementRef} from '@angular/core';

@Component({
  selector: 'app-create-connections',
  templateUrl: './create-connections.component.html',
  styleUrl: './create-connections.component.css'
})
export class CreateConnectionsComponent {
  @ViewChildren('input') inputs: QueryList<ElementRef> = new QueryList<ElementRef>();

  shareURL:string = "vicmis.com/projects/connections/create"; 
  errorMessage:string = "";
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

  allElementsFilled(){
    return this.inputs.toArray().every((input) => input.nativeElement.value.trim() !== "");
  }

  createGame(){
    if(!this.allElementsFilled()){
      this.errorMessage = "Please fill in all the boxes";
      return;
    }
    else{
      this.errorMessage = "";
    }

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
    let yellowAnswerOneElement = document.getElementById("yellow-answer-one") as HTMLInputElement;
    let yellowAnswerTwoElement = document.getElementById("yellow-answer-two") as HTMLInputElement;
    let yellowAnswerThreeElement = document.getElementById("yellow-answer-three") as HTMLInputElement;
    let yellowAnswerFourElement = document.getElementById("yellow-answer-four") as HTMLInputElement;
    yellowAnswers = yellowAnswerOneElement.value + ", " + yellowAnswerTwoElement.value + ", " + yellowAnswerThreeElement.value + ", " + yellowAnswerFourElement.value;
    yellowAnswers.replace(/\s*,\s*/g, ',');

    let greenCategoryElement = document.getElementById("green-category") as HTMLInputElement;
    let greenAnswerOneElement = document.getElementById("green-answer-one") as HTMLInputElement;
    let greenAnswerTwoElement = document.getElementById("green-answer-two") as HTMLInputElement;
    let greenAnswerThreeElement = document.getElementById("green-answer-three") as HTMLInputElement;
    let greenAnswerFourElement = document.getElementById("green-answer-four") as HTMLInputElement;
    greenAnswers = greenAnswerOneElement.value + ", " + greenAnswerTwoElement.value + ", " + greenAnswerThreeElement.value + ", " + greenAnswerFourElement.value;
    greenAnswers.replace(/\s*,\s*/g, ',');

    let blueCategoryElement = document.getElementById("blue-category") as HTMLInputElement;
    let blueAnswerOneElement = document.getElementById("blue-answer-one") as HTMLInputElement;
    let blueAnswerTwoElement = document.getElementById("blue-answer-two") as HTMLInputElement;
    let blueAnswerThreeElement = document.getElementById("blue-answer-three") as HTMLInputElement;
    let blueAnswerFourElement = document.getElementById("blue-answer-four") as HTMLInputElement;
    blueAnswers = blueAnswerOneElement.value + ", " + blueAnswerTwoElement.value + ", " + blueAnswerThreeElement.value + ", " + blueAnswerFourElement.value;
    blueAnswers.replace(/\s*,\s*/g, ',');

    let purpleCategoryElement = document.getElementById("purple-category") as HTMLInputElement;
    let purpleAnswerOneElement = document.getElementById("purple-answer-one") as HTMLInputElement;
    let purpleAnswerTwoElement = document.getElementById("purple-answer-two") as HTMLInputElement;
    let purpleAnswerThreeElement = document.getElementById("purple-answer-three") as HTMLInputElement;
    let purpleAnswerFourElement = document.getElementById("purple-answer-four") as HTMLInputElement;
    purpleAnswers = purpleAnswerOneElement.value + ", " + purpleAnswerTwoElement.value + ", " + purpleAnswerThreeElement.value + ", " + purpleAnswerFourElement.value;
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
