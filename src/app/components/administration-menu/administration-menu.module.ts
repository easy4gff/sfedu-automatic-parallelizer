import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChooseActionModule } from './choose-action/choose-action.module';
import { OptionRepresentationModule } from './option-representation/option-representation.module';
import { EditExistingOptionModule } from './edit-existing-option/edit-existing-option.module';
import { NewOptionBuilderModule } from './new-option-builder/new-option-builder.module';
import { ManageLibraryExamplesModule } from './manage-library-examples/manage-library-examples.module';

import { PanelModule } from 'primeng/primeng';

import { AdministrationMenuComponent } from './administration-menu.component';

@NgModule({
    imports: [
        PanelModule,
        RouterModule,
        ChooseActionModule,
        OptionRepresentationModule,
        EditExistingOptionModule,
        NewOptionBuilderModule,
        ManageLibraryExamplesModule
    ],
    declarations: [
        AdministrationMenuComponent,
    ],
    providers: [

    ],
    exports: [

    ]
})
export class AdministrationMenuModule {}
