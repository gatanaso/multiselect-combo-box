/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { ComboBoxItem } from '@vaadin/combo-box/src/vaadin-combo-box-item.js';

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends ComboBoxItem
 * @private
 */
class MultiselectComboBoxItem extends ComboBoxItem {
  static get is() {
    return 'multiselect-combo-box-item';
  }
}

customElements.define(MultiselectComboBoxItem.is, MultiselectComboBoxItem);
