import { Routes } from '@angular/router';
import { RoutingConstants } from '../../model/routing-utils/routing-constants';
import { ChooseActionComponent } from './choose-action/choose-action.component';
import { OptionRepresentationComponent } from './option-representation/option-representation.component';
import { NewOptionBuilderComponent } from './new-option-builder/new-option-builder.component';
import { EditExistingOptionComponent } from './edit-existing-option/edit-existing-option.component';
import { OptionEditorComponent } from './edit-existing-option/option-editor/option-editor.component';
import { OptionsListComponent } from './manage-library-examples/options-list/options-list.component';
import { ManageOptionExampleComponent } from './manage-library-examples/manage-option-example/manage-option-example.component';
import { ActionListComponent } from './manage-library-examples/action-list/action-list.component';
import { AddExampleComponent } from './manage-library-examples/add-example/add-example.component';

export const AdministrationMenuRoutes: Routes = [
    { path: '', redirectTo: RoutingConstants.CHOOSE_ACTION, pathMatch: 'full' },
    { path: RoutingConstants.CHOOSE_ACTION, component: ChooseActionComponent },
    { path: RoutingConstants.ADD_NEW_OPTION, component: NewOptionBuilderComponent },
    { path: RoutingConstants.EDIT_EXISTING_OPTION, component: EditExistingOptionComponent },
    { path: RoutingConstants.OPTION_EDITOR, component: OptionEditorComponent },
    { path: RoutingConstants.MANAGE_LIBRARY_EXAMPLES_OPTION_LIST, component: OptionsListComponent },
    { path: RoutingConstants.MANAGE_OPTION_EXAMPLE, component: ManageOptionExampleComponent },
    { path: RoutingConstants.CHOOSE_EXAMPLE_ACTION, component: ActionListComponent },
    { path: RoutingConstants.ADD_NEW_LIBRARY_EXAMPLE, component: AddExampleComponent }
];
