import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, filter, fromEvent, map, Observable, Subscription, tap } from 'rxjs';
import { DrumsEnum, ISound } from 'src/app/models';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent implements OnInit, OnDestroy {
  @Input() set sound(sound: ISound) {
    this._sound = sound;
  }

  private _sound: ISound = {
    key: '',
    sound: DrumsEnum.Kick,
  };

  get sound() {
    return this._sound;
  }
  public keyDown$: Observable<KeyboardEvent>;
  public isPlaying: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private audioService: AudioService) {
    this.keyDown$ = fromEvent(document, 'keypress').pipe(
      map((data) => data as KeyboardEvent),
      filter((data) => data.key === this.sound.key.toLocaleLowerCase()),
      tap((data) => {
        audioService.playSound(this.sound.sound);
        this.isPlaying = true;
      }),
      debounceTime(500),
      tap((_) => {
        this.isPlaying = false;
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.keyDown$.subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
