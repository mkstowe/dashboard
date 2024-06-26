import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
})
export class IconModule {
  private path = '../../assets/icons';

  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('bed', this.setPath(`${this.path}/bed.svg`))
      .addSvgIcon('candle', this.setPath(`${this.path}/candle.svg`))
      .addSvgIcon(
        'ceiling-light',
        this.setPath(`${this.path}/ceiling_light.svg`)
      )
      .addSvgIcon('chicken-leg', this.setPath(`${this.path}/chicken_leg.svg`))
      .addSvgIcon('cleaver', this.setPath(`${this.path}/cleaver.svg`))
      .addSvgIcon('clock', this.setPath(`${this.path}/clock.svg`))
      .addSvgIcon('computer', this.setPath(`${this.path}/computer.svg`))
      .addSvgIcon('couch', this.setPath(`${this.path}/couch.svg`))
      .addSvgIcon('door', this.setPath(`${this.path}/door.svg`))
      .addSvgIcon('engine', this.setPath(`${this.path}/engine.svg`))
      .addSvgIcon('fan', this.setPath(`${this.path}/fan.svg`))
      .addSvgIcon('floor-lamp', this.setPath(`${this.path}/floor_lamp.svg`))
      .addSvgIcon('gas-pump', this.setPath(`${this.path}/gas_pump.svg`))
      .addSvgIcon('house', this.setPath(`${this.path}/house.svg`))
      .addSvgIcon('leaf', this.setPath(`${this.path}/leaf.svg`))
      .addSvgIcon('light-bulb', this.setPath(`${this.path}/light_bulb.svg`))
      .addSvgIcon('line-graph', this.setPath(`${this.path}/line_graph.svg`))
      .addSvgIcon('litter', this.setPath(`${this.path}/litter.svg`))
      .addSvgIcon('lock', this.setPath(`${this.path}/lock.svg`))
      .addSvgIcon('lock-open', this.setPath(`${this.path}/lock_open.svg`))
      .addSvgIcon('music-note', this.setPath(`${this.path}/music_note.svg`))
      .addSvgIcon('plant', this.setPath(`${this.path}/plant.svg`))
      .addSvgIcon('poop', this.setPath(`${this.path}/poop.svg`))
      .addSvgIcon('power', this.setPath(`${this.path}/power.svg`))
      .addSvgIcon('roomba', this.setPath(`${this.path}/roomba.svg`))
      .addSvgIcon('security-cam', this.setPath(`${this.path}/security_cam.svg`))
      .addSvgIcon('shower', this.setPath(`${this.path}/shower.svg`))
      .addSvgIcon('speaker', this.setPath(`${this.path}/speaker.svg`))
      .addSvgIcon('speedometer', this.setPath(`${this.path}/speedometer.svg`))
      .addSvgIcon('table-lamp', this.setPath(`${this.path}/table_lamp.svg`))
      .addSvgIcon('thermometer', this.setPath(`${this.path}/thermometer.svg`))
      .addSvgIcon('toilet', this.setPath(`${this.path}/toilet.svg`))
      .addSvgIcon('tv', this.setPath(`${this.path}/tv.svg`))
      .addSvgIcon('water-drops', this.setPath(`${this.path}/water_drops.svg`))
      .addSvgIcon('wind', this.setPath(`${this.path}/wind.svg`))
      .addSvgIcon('wifi', this.setPath(`${this.path}/wifi.svg`))
      .addSvgIcon('zzz', this.setPath(`${this.path}/zzz.svg`))

      // Logos
      .addSvgIcon('crunchyroll', this.setPath(`${this.path}/crunchyroll.svg`))
      .addSvgIcon('hbo', this.setPath(`${this.path}/hbo.svg`))
      .addSvgIcon('netflix', this.setPath(`${this.path}/netflix.svg`))
      .addSvgIcon('paramount', this.setPath(`${this.path}/paramount.svg`))
      .addSvgIcon('prime', this.setPath(`${this.path}/prime.svg`))
      .addSvgIcon('spotify', this.setPath(`${this.path}/spotify.svg`))
      .addSvgIcon('tubi', this.setPath(`${this.path}/tubi.svg`))
      .addSvgIcon('youtube', this.setPath(`${this.path}/youtube.svg`));
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
