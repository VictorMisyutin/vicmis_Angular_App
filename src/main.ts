import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ModeServiceService } from './app/services/mode-service.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
