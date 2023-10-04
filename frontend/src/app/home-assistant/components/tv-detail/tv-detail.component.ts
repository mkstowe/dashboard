import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { HassService } from '../../services/hass.service';
import { ServiceCall } from '../../models/service-call';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HassEntity } from 'home-assistant-js-websocket';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TvDetailComponent implements OnInit, OnDestroy {
  public appShortcuts = AppShortcuts;
  public entity: HassEntity;
  public entityId: string;
  public entityName: string;
  public form: FormGroup = new FormGroup({});
  public isActive: boolean;
  public isSubmitted = false;
  public remoteCommands = RemoteCommands;

  private notifier$ = new Subject<void>();

  constructor(
    private hassService: HassService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    data: { entityId: string; entityName: string; isActive: boolean }
  ) {
    this.entityId = data.entityId;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  public get search(): AbstractControl {
    return this.form.get('search')!.value;
  }

  public hasError(control: AbstractControl): boolean {
    return control && control.invalid && this.isSubmitted;
  }

  public launchApp(appUrl: AppShortcuts) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'remote',
      service: 'turn_on',
      service_data: {
        activity: appUrl,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: [''],
    });

    this.hassService.entities.pipe(takeUntil(this.notifier$)).subscribe({
      next: (res) => {
        this.entity = res[this.entityId];
      },
    });
  }

  public onButtonPress(command: RemoteCommands) {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'remote',
      service: 'send_command',
      service_data: {
        command,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public onPowerClick() {
    const service: ServiceCall = {
      type: 'call_service',
      domain: 'remote',
      service: 'toggle',
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);
  }

  public onSearch() {
    this.isSubmitted = true;

    if (this.form.invalid) return false;

    const service: ServiceCall = {
      type: 'call_service',
      domain: 'remote',
      service: 'turn_on',
      service_data: {
        activity: this.search,
      },
      target: {
        entity_id: this.entity.entity_id,
      },
    };

    this.hassService.callService(service);

    return false;
  }
}

enum RemoteCommands {
  DPAD_UP = 'DPAD_UP',
  DPAD_RIGHT = 'DPAD_RIGHT',
  DPAD_DOWN = 'DPAD_DOWN',
  DPAD_LEFT = 'DPAD_LEFT',
  DPAD_CENTER = 'DPAD_CENTER',
  VOLUME_UP = 'VOLUME_UP',
  VOLUME_DOWN = 'VOLUME_DOWN',
  VOLUME_MUTE = 'VOLUME_MUTE',
  HOME = 'HOME',
  BACK = 'BACK',
  MEDIA_PLAY_PAUSE = 'MEDIA_PLAY_PAUSE',
  MEDIA_NEXT = 'MEDIA_NEXT',
  MEDIA_PREVIOUS = 'MEDIA_PREVIOUS',
}

enum AppShortcuts {
  APPLE = 'https://tv.apple.com',
  CRUNCHYROLL = 'crunchyroll://',
  DISNEY = 'https://www.disneyplus.com',
  HBO = 'https://play.hbomax.com',
  NETFLIX = 'https://www.netflix.com/title',
  PARAMOUNT = 'https://www.paramountplus.com',
  PLUTO = 'https://pluto.tv/en/live-tv',
  PRIME = 'https://app.primevideo.com',
  SPOTIFY = 'spotify://',
  TUBI = 'https://tubitv.com',
  YOUTUBE = 'https://www.youtube.com',

  // Currently the links for launching these are unknown
  FREEVEE = '',
  FUNIMATION = '',
  HULU = '',
  PEACOCK = '',
  SHUDDER = '',
}
