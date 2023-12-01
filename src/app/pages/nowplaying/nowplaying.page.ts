import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl, Howler } from 'howler';
import { podcasts, discover } from 'src/app/services/shared/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.page.html',
  styleUrls: ['./nowplaying.page.scss'],
})
export class NowplayingPage implements OnInit {
  @ViewChild('range', { static: false }) range!: IonRange;
  isPlaying: Boolean = false;
  progress = 0;
  player!: Howl;
  podcast: any;
  minutesLeft="";
  totalTime={minutes:0, seconds:0};
  seekTime={minutes:0, seconds:0};
  constructor(private router: Router) {}

  ngOnInit() {
    this.getPodcast();
    console.log(this.podcast);
  }

  getPodcast() {
    this.podcast = this.router.getCurrentNavigation()?.extras.state;
    this.startPlayer(this.podcast?.audio);
  }

  startPlayer(src:any) {
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src,
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.playerProgress();
      },
      onend:()=>{
          this.isPlaying = false;
        
      }
    });

    this.player.play();
  }

  seekBack() {
    this.seek('BACK');
  }

  seekForward() {
    this.seek('FORWARD');
  }

  seek(direction = 'PLAYING') {
    let newValue = <number>this.range.value;
    let duration = this.player.duration();

    if (direction == 'FORWARD') {
      this.player.seek(this.player.seek() + 15);
      return;
    }

    if (direction == 'BACK') {
      this.player.seek(this.player.seek() - 15);
      return;
    }

    this.player.seek(duration * (newValue / 100));
  }

  togglePlay(pause:any) {
    this.isPlaying = !pause;

    if (pause) {
      this.player.pause();
      return;
    }

    this.player.play();
  }

  playerProgress() {
    let seek = this.player.seek();
    let duration = this.player.duration();

    if(this.totalTime.minutes===0){
      this.totalTime = this.secondsToMinutes(duration);
    }
    this.seekTime = this.secondsToMinutes(seek);
    
    this.progress = (seek / duration) * 100 || 0;

    this.minutesLeft = "left "+this.secondsToMinutes(duration-seek).minutes.toString()+" min"

    setTimeout(() => {
      if (this.isPlaying) {
        this.playerProgress();
      }
    }, 1000);
  }

  ionViewWillLeave() {
    if (this.player) this.player.stop();
  }

  secondsToMinutes(seconds:number) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return {
      minutes: minutes,
      seconds: remainingSeconds
    };
  }
}
