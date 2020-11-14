import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { QueryComponent } from './query/query.component';
import { ViewsComponent } from './views/views.component';

export const routes: Routes = [

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'create', component: CreateComponent },
  { path: 'views', component: ViewsComponent },
  { path: 'query', component: QueryComponent }
];

