import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { LandingComponent } from './main/landing/landing.component';
import { DemoMaterialModule } from './material-module';
import { LandingModalComponent } from './main/landing/landing-modal/landing-modal.component';
import { DragDropDirective } from './drag-drop.directive';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { StyleComponent } from './main/style/style.component';
import { StyleModalComponent } from './main/style/style-modal/style-modal.component';
import { ColorComponent } from './main/color/color.component';
import { ColorModalComponent } from './main/color/color-modal/color-modal.component';
import { SizeComponent } from './main/size/size.component';
import { SizeModalComponent } from './main/size/size-modal/size-modal.component';
import { OrderComponent } from './main/order/order.component';

const appRoutes: Routes = [
    {
        path: "landing",
        component: LandingComponent
    },
    {
        path: "style",
        component: StyleComponent
    },
    {
        path: "color",
        component: ColorComponent
    },
    {
        path: "size",
        component: SizeComponent
    },
    {
        path: "order",
        component: OrderComponent
    },
    {
        path      : '**',
        redirectTo: 'landing'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        LandingModalComponent,
        DragDropDirective,
        StyleComponent,
        StyleModalComponent,
        ColorComponent,
        ColorModalComponent,
        SizeComponent,
        SizeModalComponent,
        OrderComponent
    ],
    entryComponents: [
        LandingModalComponent,
        StyleModalComponent,
        ColorModalComponent,
        SizeModalComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        DemoMaterialModule,
        AutosizeModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
