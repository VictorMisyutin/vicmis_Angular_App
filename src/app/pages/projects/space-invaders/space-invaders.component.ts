import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-space-invaders',
  templateUrl: './space-invaders.component.html',
  styleUrl: './space-invaders.component.css'
})
export class SpaceInvadersComponent implements OnInit{
  ngOnInit() {
    //@ts-ignore
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "/assets/yourProjectName/Build/yourProjectName.data",
      frameworkUrl: "/assets/yourProjectName/Build/yourProjectName.framework.js",
      codeUrl: "/assets/yourProjectName/Build/yourProjectName.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "YourCompagny",
      productName: "yourProjectName",
      productVersion: "1.0"
    });
  } 
}
