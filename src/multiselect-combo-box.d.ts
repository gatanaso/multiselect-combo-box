import { PolymerElement } from '@polymer/polymer';
import { ComboBoxRenderer } from '@vaadin/vaadin-combo-box';
import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ThemePropertyMixin } from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin';
import { MultiselectComboBoxMixin } from './multiselect-combo-box-mixin';

declare class MultiselectComboBoxElement<T = unknown> extends ControlStateMixin(
  ThemePropertyMixin(ThemableMixin(MultiselectComboBoxMixin(PolymerElement))),
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

  ready: () => void;
  checkValidity: () => void;
  validate: () => boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'multiselect-combo-box': MultiselectComboBoxElement<unknown>;
  }
}

export { MultiselectComboBoxElement };
