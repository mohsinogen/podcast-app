import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'station',
    loadChildren: () =>
      import('./pages/station/station.module').then((m) => m.StationPageModule),
  },
  {
    path: 'nowplaying',
    loadChildren: () =>
      import('./pages/nowplaying/nowplaying.module').then(
        (m) => m.NowplayingPageModule
      ),
  },
  {
    path: 'search-result',
    loadChildren: () =>
      import('./pages/search-result/search-result.module').then(
        (m) => m.SearchResultPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
