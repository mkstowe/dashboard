import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing';

@NgModule({
  imports: [CommonModule, SharedModule, CoreRoutingModule],
})
export class CoreModule {}
