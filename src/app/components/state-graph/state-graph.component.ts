import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HassService } from 'src/app/services/HassService';
import { ChartConfiguration } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'chartjs-adapter-moment';
import { SensorOptions } from 'src/app/shared/core.models';

@Component({
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StateGraphComponent implements OnInit {
  public entity: any;
  public stateData: any;
  public labels: any;
  public sensorOptions: SensorOptions;

  public lineChartData: ChartConfiguration['data'];

  public lineChartOptions: ChartConfiguration['options'];

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA) data: { entity: any; sensorOptions: SensorOptions }
  ) {
    this.entity = data.entity;
    this.sensorOptions = data.sensorOptions;
  }

  ngOnInit(): void {
    this.lineChartOptions = {
      parsing: false,
      scales: {
        x: {
          type: 'time',
          ticks: {
            source: 'auto',
            autoSkip: true,
          },
        },
        y: {
          position: 'left',
          title: {
            display: true,
            text: this.entity.attributes.unit_of_measurement,
            color: '#d8dae6',
            font: {
              size: 14,
            },
          },
        },
      },

      plugins: {
        legend: { display: false },
        decimation: {
          enabled: true,
          algorithm: 'lttb',
          samples: 100,
          threshold: 1,
        },
      },
    };
    this.hassService
      .getEntityHistory(this.sensorOptions.entityId)
      .subscribe((history) => {
        this.lineChartData = {
          datasets: [
            {
              data: (history as Array<any>)[0].map((s: any) => {
                return {
                  x: new Date(s.last_updated).getTime(),
                  y: this.sensorOptions.stateOptions?.round
                    ? Math.round(+s.state)
                    : +s.state,
                };
              }),
              label: 'State',
              backgroundColor: '#252425',
              borderColor: '#d8dae6',
              pointBackgroundColor: '#252425',
              pointBorderColor: '#d8dae6',
              pointRadius: 3,
              pointHitRadius: 5,
              fill: 'origin',
              stepped: true,
              spanGaps: false,
            },
          ],
        };
      });
  }
}
