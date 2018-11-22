import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule
 } from '@angular/material';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
    imports: [
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        MatAutocompleteModule
    ],
    exports: [
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        MatAutocompleteModule
    ]
})

export class MaterialModule {}
