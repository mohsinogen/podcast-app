import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NowplayingPageRoutingModule } from './nowplaying-routing.module';

import { NowplayingPage } from './nowplaying.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NowplayingPageRoutingModule
  ],
  declarations: [NowplayingPage]
})
export class NowplayingPageModule {}
