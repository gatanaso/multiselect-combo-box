import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import { inputFieldShared } from '@vaadin/vaadin-lumo-styles/mixins/input-field-shared.js';
import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

const multiselectComboBox = css`
  :host([has-value]:not([compact-mode]):not([readonly])) {
    padding-inline-start: 0;
  }

  [part='chip']:not(:last-of-type) {
    margin-inline-end: var(--lumo-space-xs);
  }

  [part='compact-mode-prefix'] {
    box-sizing: border-box;
    min-width: 70px;
    padding: 0 0.25em;
    color: var(--lumo-body-text-color);
    font-family: var(--lumo-font-family);
    font-weight: 500;
    cursor: var(--lumo-clickable-cursor);
  }

  :host([disabled]) [part='compact-mode-prefix'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
    pointer-events: none;
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }
`;

registerStyles('multiselect-combo-box', [inputFieldShared, multiselectComboBox], {
  moduleId: 'lumo-multiselect-combo-box'
});
