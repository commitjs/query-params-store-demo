import { Component, OnInit } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';
import { Router } from '@angular/router';
import { combineLatest, zip } from 'rxjs';
import { first, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  page$ = this.qps.select('page');
  userId$ = this.qps.select('userId');
  pageSize$ = this.qps.select(s => s.pageSize);

  usersPage$ = this.qps.select('page').pipe(map(page => page[0]), distinctUntilChanged());
  postsPage$ = this.qps.select('page').pipe(map(page => page[1]), distinctUntilChanged());

  usersPageSize$ = this.qps.select('pageSize').pipe(map(pageSize => pageSize[0]), distinctUntilChanged());
  postsPageSize$ = this.qps.select('pageSize').pipe(map(pageSize => pageSize[1]), distinctUntilChanged());

  usersData$ = combineLatest(this.usersPage$, this.usersPageSize$).pipe(
    switchMap(([page, pageSize]) => this.userService.loadUsers({ page, pageSize }))
  );
  postsData$ = combineLatest(this.postsPage$, this.postsPageSize$, this.userId$).pipe(
    switchMap(([page, pageSize, userId]) => {
      const data: any = { page, pageSize };
      if (userId) { data.userId = userId; }
      return this.userService.loadPosts(data);
    })
  );

  constructor(
    private qps: QueryParamsStore,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() { }

  selectUser(user) {
    zip(this.userId$, this.page$).pipe(first()).subscribe(([userId, page]) => {
      this.router.navigate([], {
        queryParams: {
          userId: userId === user.id ? null : user.id,
          page: `${page[0]};1`
        },
        queryParamsHandling: 'merge'
      });
    });
  }

  nextUsersPage() {
    this.page$.pipe(first()).subscribe((page) => {
      page[0] = page[0] + 1;
      this.router.navigate([], {
        queryParams: { page: `${page[0]};${page[1]}` },
        queryParamsHandling: 'merge'
      });
    });
  }

  prevUsersPage() {
    this.page$.pipe(first()).subscribe((page) => {
      page[0] = page[0] - 1;
      this.router.navigate([], {
        queryParams: { page: `${page[0]};${page[1]}` },
        queryParamsHandling: 'merge'
      });
    });
  }

  nextPostsPage() {
    this.page$.pipe(first()).subscribe((page) => {
      page[1] = page[1] + 1;
      this.router.navigate([], {
        queryParams: { page: `${page[0]};${page[1]}` },
        queryParamsHandling: 'merge'
      });
    });
  }

  prevPostsPage() {
    this.page$.pipe(first()).subscribe((page) => {
      page[1] = page[1] - 1;
      this.router.navigate([], {
        queryParams: { page: `${page[0]};${page[1]}` },
        queryParamsHandling: 'merge'
      });
    });
  }
}
