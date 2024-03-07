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
      dataUrl: "/src/assets/Build/assets.data",
      frameworkUrl: "/src/assets/Build/assets.framework.js",
      codeUrl: "/src/assets/Build/assets.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "YourCompagny",
      productName: "yourProjectName",
      productVersion: "1.0"
    });
} 
}
