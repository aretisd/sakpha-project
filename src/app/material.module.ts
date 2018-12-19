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
    MatStepperModule
 } from '@angular/material';
 import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


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
        MatAutocompleteModule,
        MatTableModule,
        MatDialogModule,
        FormsModule
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
        MatAutocompleteModule,
        MatTableModule,
        MatDialogModule,
        FormsModule
    ]
})

export class MaterialModule {}
