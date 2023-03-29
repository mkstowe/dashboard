import { Component, OnInit } from '@angular/core';
import { HassService } from 'src/app/services/HassService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public date: Date = new Date();

  constructor(private deviceService: HassService) {}

  ngOnInit(): void {
    this.deviceService.getStates().subscribe({
      next: (result) => {
        console.log(result);
      },
    });
  }
}
