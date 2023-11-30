import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NowplayingPage } from './nowplaying.page';

const routes: Routes = [
  {
    path: '',
    component: NowplayingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NowplayingPageRoutingModule {}
