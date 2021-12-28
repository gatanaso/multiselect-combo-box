import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

registerStyles(
  'multiselect-combo-box-overlay',
  css`
    :host([opening]),
    :host([closing]),
    :host([opening]) [part='overlay'],
    :host([closing]) [part='overlay'] {
      animation: none !important;
    }
  `
);
