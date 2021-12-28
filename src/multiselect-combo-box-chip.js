/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

/**
 * An element used by `<multiselect-combo-box>` to display selected items.
 *
 * @extends HTMLElement
 * @private
 */
class MultiselectComboBoxChip extends ThemableMixin(PolymerElement) {
  static get is() {
    return 'multiselect-combo-box-chip';
  }

  static get properties() {
    return {
      label: {
        type: String
      },

      item: {
        type: Object
      }
    };
  }

  static get template() {
    return html`
      <div part="label">[[label]]</div>
      <div part="remove-button" role="button" on-click="_onRemoveClick"></div>
    `;
  }

  /** @private */
  _onRemoveClick(event) {
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('item-removed', {
        detail: {
          item: this.item
        },
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define(MultiselectComboBoxChip.is, MultiselectComboBoxChip);
