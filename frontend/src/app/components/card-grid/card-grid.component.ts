import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardGridComponent {
  @ContentChildren('card') children: QueryList<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() cards: any[];
}
