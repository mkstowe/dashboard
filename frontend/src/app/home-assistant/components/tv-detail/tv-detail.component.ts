import {
  Component,
  OnInit,
  Input,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { HassService } from '../../services/hass.service';
import { ServiceCall } from '../../models/service-call';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TvDetailComponent implements OnInit {
  public entity: any;
  public entityName: string;
  public isActive: boolean;
  public remoteCommands = RemoteCommands;
  public appShortcuts = AppShortcuts;

  private entityUpdate: Subject<any> = new Subject<any>();
  // public searchForm = new FormControl();
  public form: FormGroup = new FormGroup({});
  public isSubmitted = false;

  constructor(
    private hassService: HassService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    data: { entity: any; entityName: string; isActive: boolean }
  ) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.isActive = data.isActive;
  }

  ngOnInit(): void {
    const urlReg =
      '/^https?://(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/';
    this.form = this.formBuilder.group({
      // search: ['', [Validators.pattern(urlReg)]],
      search: [''],
    });

    this.hassService.entities.subscribe({
      next: () => {
        return;
      },
    });

    this.entityUpdate.next(null);
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

    this.entityUpdate.next(null);
  }

  public onButtonPress(command: RemoteCommands) {
    console.log(command);
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
    this.entityUpdate.next(null);
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
    this.entityUpdate.next(null);
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
    this.entityUpdate.next(null);

    return false;
  }

  public get search(): AbstractControl {
    return this.form.get('search')!.value;
  }

  public hasError(control: AbstractControl): boolean {
    return control && control.invalid && this.isSubmitted;
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
