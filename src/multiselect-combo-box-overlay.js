/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { ComboBoxOverlay } from '@vaadin/combo-box/src/vaadin-combo-box-overlay.js';
import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

registerStyles(
  'multiselect-combo-box-overlay',
  css`
    #overlay {
      width: var(--multiselect-combo-box-overlay-width, var(--_multiselect-combo-box-overlay-default-width, auto));
    }
  `,
  { moduleId: 'multiselect-combo-box-overlay-styles' }
);

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends ComboBoxOverlay
 * @private
 */
class MultiselectComboBoxOverlay extends ComboBoxOverlay {
  static get is() {
    return 'multiselect-combo-box-overlay';
  }
}

customElements.define(MultiselectComboBoxOverlay.is, MultiselectComboBoxOverlay);
