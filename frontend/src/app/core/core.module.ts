import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule],
  exports: [SidebarComponent],
})
export class CoreModule {}
