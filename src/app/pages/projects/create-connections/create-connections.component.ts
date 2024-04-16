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

    let yellowCategoryElement = document.getElementById("yellowCategory") as HTMLInputElement;
    let yellowAnswersElements = document.getElementById("yellowAnswers") as HTMLInputElement;
    let greenCategoryElement = document.getElementById("greenCategory") as HTMLInputElement;
    let greenAnswersElements = document.getElementById("greenAnswers") as HTMLInputElement;
    let blueCategoryElement = document.getElementById("blueCategory") as HTMLInputElement;
    let blueAnswersElements = document.getElementById("blueAnswers") as HTMLInputElement;
    let purpleCategoryElement = document.getElementById("purpleCategory") as HTMLInputElement;
    let purpleAnswersElements = document.getElementById("purpleAnswers") as HTMLInputElement;
    console.log(purpleAnswersElements.value);
    yellowCategory = this.encrypt(yellowCategoryElement.value.trim());
    greenCategory = this.encrypt(greenCategoryElement.value.trim());
    blueCategory = this.encrypt(blueCategoryElement.value.trim());
    purpleCategory = this.encrypt(purpleCategoryElement.value.trim());
    
    yellowAnswers = this.encrypt(yellowAnswersElements.value.replace(/\s*,\s*/g, ','));
    greenAnswers = this.encrypt(greenAnswersElements.value.replace(/\s*,\s*/g, ','));
    blueAnswers = this.encrypt(blueAnswersElements.value.replace(/\s*,\s*/g, ','));
    purpleAnswers = this.encrypt(purpleAnswersElements.value.replace(/\s*,\s*/g, ','));
    console.log(purpleAnswers);
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
