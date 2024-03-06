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
      dataUrl: "/assets/Build/assets.data.br",
      frameworkUrl: "/assets/Build/assets.framework.js",
      codeUrl: "/assets/Build/assets.wasm.br",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "YourCompagny",
      productName: "yourProjectName",
      productVersion: "1.0"
    });
  } 
}
