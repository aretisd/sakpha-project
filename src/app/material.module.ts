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
        MatSelectModule
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
        MatSelectModule
    ]
})

export class MaterialModule {}
