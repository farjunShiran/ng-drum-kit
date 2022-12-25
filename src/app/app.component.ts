import { Component } from '@angular/core';
import { ISound } from './models';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public drumKit: Array<ISound>;

  constructor(private audioService: AudioService) {
    this.drumKit = audioService.getDrumKit();
  }
}
