import { NgModule } from "@angular/core";
import { MatButtonModule} from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

@NgModule({
    imports: [ MatButtonModule, MatExpansionModule, MatIconModule ],
    exports: [ MatButtonModule, MatExpansionModule, MatIconModule ],
    providers: [ MatIconRegistry ]
})
export class MaterialModule {}
