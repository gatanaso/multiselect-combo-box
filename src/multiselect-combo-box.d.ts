import { IronResizableBehavior } from '@polymer/iron-resizable-behavior';
import { PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ComboBoxRenderer } from '@vaadin/vaadin-combo-box';
import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ThemePropertyMixin } from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin';
import { MultiselectComboBoxMixin } from './multiselect-combo-box-mixin';

declare class MultiselectComboBoxElement<T> extends ControlStateMixin(
  ThemePropertyMixin(
    ThemableMixin(
      MultiselectComboBoxMixin(
        mixinBehaviors([IronResizableBehavior], PolymerElement),
      ),
    ),
  ),
) {
  readonly is: string;
  readonly observers: string[];
  readonly inputElement: HTMLElement;
  readonly focusElement: HTMLElement;

  label: string;
  hasLabel: boolean;
  title: string;
  selectedItems: T[];
  ordered: boolean;
  pageSize: number;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
  errorMessage: string;
  readonlyValueSeparator: string;
  allowCustomValues: boolean;
  renderer: ComboBoxRenderer;
  filterValue: string;
  filteredItems: T[];
}

declare global {
  interface HTMLElementTagNameMap {
    'multiselect-combo-box': MultiselectComboBoxElement<unknown>;
  }
}

export { MultiselectComboBoxElement };
