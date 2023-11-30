import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { podcasts, discover } from 'src/app/services/shared/data';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  fresh:any = [];
  query!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getQuery();
  }

  getQuery() {
    this.route.queryParams.subscribe(async ({ q }) => {
      this.query = q;

      // this.filter(q);
      this.fresh = podcasts.filter((item) => {
        const regex = new RegExp(`${q}`, 'gi');
        return item?.title?.match(regex) || item?.podcast?.match(regex);
      });
    });
  }

  filter(e:any) {
    const term = e.target.value;

    if (!term) {
      return;
    }
    this.fresh = podcasts.filter((item) => {
      const regex = new RegExp(`${term}`, 'gi');
      return item?.title?.match(regex) || item?.podcast?.match(regex);
    });
  }

  castPod(podcast:any) {
    const navExtras: NavigationExtras = {
      state: podcast,
    };

    this.router.navigate(['nowplaying'], navExtras);
  }
}
