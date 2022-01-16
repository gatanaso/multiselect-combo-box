import './multiselect-combo-box-item.js';
import './multiselect-combo-box-overlay.js';
import './multiselect-combo-box-scroller.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { ComboBoxDropdown } from '@vaadin/combo-box/src/vaadin-combo-box-dropdown.js';

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends ComboBoxDropdown
 * @private
 */
class MultiselectComboBoxDropdown extends ComboBoxDropdown {
  static get is() {
    return 'multiselect-combo-box-dropdown';
  }

  static get template() {
    return html`
      <multiselect-combo-box-overlay
        id="overlay"
        hidden$="[[_isOverlayHidden(_items.*, loading)]]"
        loading$="[[loading]]"
        opened="{{_overlayOpened}}"
        theme$="[[theme]]"
        position-target="[[positionTarget]]"
        no-vertical-overlap
      ></multiselect-combo-box-overlay>
    `;
  }
}

customElements.define(MultiselectComboBoxDropdown.is, MultiselectComboBoxDropdown);
