import { Injectable } from '@angular/core';
import { DrumsEnum, ISound } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  private soundVoice: HTMLAudioElement = new Audio();
  private _drumKit: Array<ISound> = [
    {
      key: 'z',
      sound: DrumsEnum.Kick,
    },
    {
      key: 'x',
      sound: DrumsEnum.Kick1,
    },
    {
      key: 'c',
      sound: DrumsEnum.Rim,
    },
    {
      key: 'v',
      sound: DrumsEnum.Snare,
    },
    {
      key: 'b',
      sound: DrumsEnum.Crash1,
    },
    {
      key: 'n',
      sound: DrumsEnum.GateKick,
    },
  ];
  constructor() {}

  getDrumKit(): ISound[] {
    return this._drumKit;
  }

  playSound(sound: DrumsEnum) {

   const pathAudio:string=`assets/audio/${sound}`

   this.soundVoice=new Audio(pathAudio);
   
   this.soundVoice.play().then(() => this.soundVoice.remove());
  }

}
