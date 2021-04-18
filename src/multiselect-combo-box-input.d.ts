import { PolymerElement } from '@polymer/polymer';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
import { ThemePropertyMixin } from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin';
import { MultiselectComboBoxMixin } from './multiselect-combo-box-mixin';

declare class MultiselectComboBoxInput extends ThemePropertyMixin(
  ThemableMixin(MultiselectComboBoxMixin(PolymerElement)),
) {
  readonly is: string;
  value: string;
}

export { MultiselectComboBoxInput };
