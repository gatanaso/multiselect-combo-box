/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import '@polymer/polymer/lib/elements/dom-repeat.js';
import './multiselect-combo-box-chip.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { css, registerStyles, ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { MultiselectComboBoxMixin } from './multiselect-combo-box-mixin.js';

registerStyles(
  'multiselect-combo-box-chips',
  css`
    :host {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 1;
      min-width: 0;
    }

    :host([hidden]) {
      display: none !important;
    }
  `,
  { moduleId: 'multiselect-combo-box-chips-styles' }
);

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends HTMLElement
 * @mixes MultiselectComboBoxMixin
 * @mixes ThemableMixin
 * @private
 */
class MultiselectComboBoxChips extends MultiselectComboBoxMixin(ThemableMixin(PolymerElement)) {
  static get is() {
    return 'multiselect-combo-box-chips';
  }

  static get template() {
    return html`
      <template id="repeat" is="dom-repeat" items="[[items]]">
        <multiselect-combo-box-chip
          part="chip"
          item="[[item]]"
          label="[[_getItemLabel(item, itemLabelPath)]]"
        ></multiselect-combo-box-chip>
      </template>
    `;
  }

  requestContentUpdate() {
    this.$.repeat.render();
  }
}

customElements.define(MultiselectComboBoxChips.is, MultiselectComboBoxChips);
