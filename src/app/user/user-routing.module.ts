import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EntityComponent } from './entity/entity.component';
import { IQueryParamsStoreRoutes } from 'query-params-store';


const routes: IQueryParamsStoreRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user/list'
  },
  {
    path: 'list',
    component: ListComponent,
    data: {
      storeConfig: {
        stateConfig: {
          page: {
            multi: true,
            value: '1;1',
            separator: ';',
            typeConvertor: Number
          },
          pageSize: {
            multi: true,
            value: '5;5',
            separator: ';',
            allowedValues: [5, 10, 20],
            typeConvertor: Number
          },
          userId: {
            value: null,
            typeConvertor: Number
          },
          openToggles: {
            value: 6,
            length: 5,
            typeConvertor: Boolean,
            multi: true
          }
        },
        removeUnknown: true
      }
    }
  },
  {
    path: 'add',
    component: EntityComponent
  },
  {
    path: 'edit/:id',
    component: EntityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
