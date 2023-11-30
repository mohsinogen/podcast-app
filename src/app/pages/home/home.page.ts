import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { podcasts, discover } from 'src/app/services/shared/data';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  query!: string;
  fresh = podcasts;
  discoverList = discover;
  isActive: boolean = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  search(e:any) {
    if (e && e.key === 'Enter') {
      const navExtras: NavigationExtras = {
        queryParams: { q: e.target.value },
      };
      this.router.navigate(['search-result'], navExtras);
    }
  }

  channel(channel:any) {
    const navExtras: NavigationExtras = {
      state: channel,
    };

    this.router.navigate(['station'], navExtras);
  }

  castPod(podcast:any) {
    const navExtras: NavigationExtras = {
      state: podcast,
    };

    this.router.navigate(['nowplaying'], navExtras);
  }

  async openProfile() {
    const modal = await this.modalCtrl.create({
      backdropDismiss:true,
      presentingElement: this.routerOutlet.nativeEl,
      mode: 'ios',
      component: ProfileComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
