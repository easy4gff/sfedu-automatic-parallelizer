import { Routes } from '@angular/router';
import { RoutingConstants } from '../../model/routing-utils/routing-constants';
import { ChooseActionComponent } from './choose-action/choose-action.component';
import { OptionRepresentationComponent } from './option-representation/option-representation.component';
import { NewOptionBuilderComponent } from './new-option-builder/new-option-builder.component';
import { EditExistingOptionComponent } from './edit-existing-option/edit-existing-option.component';
import { OptionEditorComponent } from './edit-existing-option/option-editor/option-editor.component';

export const AdministrationMenuRoutes: Routes = [
    { path: '', redirectTo: RoutingConstants.CHOOSE_ACTION, pathMatch: 'full' },
    { path: RoutingConstants.CHOOSE_ACTION, component: ChooseActionComponent },
    { path: RoutingConstants.ADD_NEW_OPTION, component: NewOptionBuilderComponent },
    { path: RoutingConstants.EDIT_EXISTING_OPTION, component: EditExistingOptionComponent },
    { path: RoutingConstants.OPTION_EDITOR, component: OptionEditorComponent }
];
