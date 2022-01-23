import { ComboBoxPlaceholder } from '@vaadin/combo-box/src/vaadin-combo-box-placeholder.js';
import { ComboBoxScroller } from '@vaadin/combo-box/src/vaadin-combo-box-scroller.js';

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends ComboBoxScroller
 * @private
 */
class MultiselectComboBoxScroller extends ComboBoxScroller {
  static get is() {
    return 'multiselect-combo-box-scroller';
  }

  /** @private */
  __isItemSelected(item, _selectedItem, itemIdPath) {
    if (item instanceof ComboBoxPlaceholder) {
      return false;
    }

    const host = this.comboBox.getRootNode().host;
    return host._findIndex(item, host.selectedItems, itemIdPath) > -1;
  }
}

customElements.define(MultiselectComboBoxScroller.is, MultiselectComboBoxScroller);
