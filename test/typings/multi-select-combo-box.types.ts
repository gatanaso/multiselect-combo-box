import { ComboBoxRenderer } from '@vaadin/combo-box/src/vaadin-combo-box.js';
import { ControllerMixinClass } from '@vaadin/component-base/src/controller-mixin.js';
import { DisabledMixinClass } from '@vaadin/component-base/src/disabled-mixin.js';
import { ElementMixinClass } from '@vaadin/component-base/src/element-mixin.js';
import { FocusMixinClass } from '@vaadin/component-base/src/focus-mixin.js';
import { KeyboardMixinClass } from '@vaadin/component-base/src/keyboard-mixin.js';
import { DelegateFocusMixinClass } from '@vaadin/field-base/src/delegate-focus-mixin.js';
import { DelegateStateMixinClass } from '@vaadin/field-base/src/delegate-state-mixin.js';
import { FieldMixinClass } from '@vaadin/field-base/src/field-mixin.js';
import { InputConstraintsMixinClass } from '@vaadin/field-base/src/input-constraints-mixin.js';
import { InputControlMixinClass } from '@vaadin/field-base/src/input-control-mixin.js';
import { InputMixinClass } from '@vaadin/field-base/src/input-mixin.js';
import { LabelMixinClass } from '@vaadin/field-base/src/label-mixin.js';
import { ValidateMixinClass } from '@vaadin/field-base/src/validate-mixin.js';
import { ThemableMixinClass } from '@vaadin/vaadin-themable-mixin';
import {
  MultiselectComboBox,
  MultiselectComboBoxChangeEvent,
  MultiselectComboBoxCompactModeLabelGenerator,
  MultiselectComboBoxCustomValuesSetEvent,
  MultiselectComboBoxFilterValueChangedEvent,
  MultiselectComboBoxInvalidChangedEvent,
  MultiselectComboBoxSelectedItemsChangedEvent
} from '../../multiselect-combo-box.js';
import { MultiselectComboBoxMixinClass } from '../../src/multiselect-combo-box-mixin.js';

interface TestComboBoxItem {
  testProperty: string;
}

const assertType = <TExpected>(actual: TExpected) => actual;

const genericComboBox = document.createElement('multiselect-combo-box');
assertType<MultiselectComboBox>(genericComboBox);

const narrowedComboBox = genericComboBox as MultiselectComboBox<TestComboBoxItem>;

// Events
narrowedComboBox.addEventListener('change', (event) => {
  assertType<MultiselectComboBoxChangeEvent<TestComboBoxItem>>(event);
  assertType<MultiselectComboBox<TestComboBoxItem>>(event.target);
});

narrowedComboBox.addEventListener('custom-values-set', (event) => {
  assertType<MultiselectComboBoxCustomValuesSetEvent>(event);
  assertType<string>(event.detail);
});

narrowedComboBox.addEventListener('filter-value-changed', (event) => {
  assertType<MultiselectComboBoxFilterValueChangedEvent>(event);
  assertType<string>(event.detail.value);
});

narrowedComboBox.addEventListener('invalid-changed', (event) => {
  assertType<MultiselectComboBoxInvalidChangedEvent>(event);
  assertType<boolean>(event.detail.value);
});

narrowedComboBox.addEventListener('selected-items-changed', (event) => {
  assertType<MultiselectComboBoxSelectedItemsChangedEvent<TestComboBoxItem>>(event);
  assertType<Array<TestComboBoxItem>>(event.detail.value);
});

// Properties
assertType<() => boolean>(narrowedComboBox.checkValidity);
assertType<() => boolean>(narrowedComboBox.validate);
assertType<boolean>(narrowedComboBox.allowCustomValues);
assertType<boolean | null | undefined>(narrowedComboBox.autoOpenDisabled);
assertType<string>(narrowedComboBox.filterValue);
assertType<TestComboBoxItem[] | undefined>(narrowedComboBox.filteredItems);
assertType<TestComboBoxItem[] | undefined>(narrowedComboBox.items);
assertType<string | null | undefined>(narrowedComboBox.itemIdPath);
assertType<string>(narrowedComboBox.itemLabelPath);
assertType<string>(narrowedComboBox.itemValuePath);
assertType<ComboBoxRenderer<TestComboBoxItem> | null | undefined>(narrowedComboBox.renderer);
assertType<boolean>(narrowedComboBox.invalid);
assertType<HTMLElement | null | undefined>(narrowedComboBox.focusElement);
assertType<boolean>(narrowedComboBox.disabled);
assertType<boolean>(narrowedComboBox.clearButtonVisible);
assertType<string | null | undefined>(narrowedComboBox.errorMessage);
assertType<string>(narrowedComboBox.placeholder);
assertType<string | null | undefined>(narrowedComboBox.helperText);
assertType<boolean>(narrowedComboBox.readonly);
assertType<string | null | undefined>(narrowedComboBox.label);
assertType<boolean>(narrowedComboBox.required);
assertType<boolean>(narrowedComboBox.compactMode);
assertType<MultiselectComboBoxCompactModeLabelGenerator<TestComboBoxItem>>(narrowedComboBox.compactModeLabelGenerator);
assertType<string>(narrowedComboBox.readonlyValueSeparator);

// Mixins
assertType<MultiselectComboBoxMixinClass<TestComboBoxItem>>(narrowedComboBox);
assertType<ControllerMixinClass>(narrowedComboBox);
assertType<ElementMixinClass>(narrowedComboBox);
assertType<DelegateFocusMixinClass>(narrowedComboBox);
assertType<DelegateStateMixinClass>(narrowedComboBox);
assertType<DisabledMixinClass>(narrowedComboBox);
assertType<FieldMixinClass>(narrowedComboBox);
assertType<FocusMixinClass>(narrowedComboBox);
assertType<InputConstraintsMixinClass>(narrowedComboBox);
assertType<InputControlMixinClass>(narrowedComboBox);
assertType<InputMixinClass>(narrowedComboBox);
assertType<KeyboardMixinClass>(narrowedComboBox);
assertType<LabelMixinClass>(narrowedComboBox);
assertType<ValidateMixinClass>(narrowedComboBox);
assertType<ThemableMixinClass>(narrowedComboBox);
