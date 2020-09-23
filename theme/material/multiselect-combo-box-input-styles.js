import '@vaadin/vaadin-material-styles/typography.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/mixins/field-button.js';
import './multiselect-combo-box-material.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = // eslint-disable-line camelcase
html`
  <dom-module id="material-multiselect-combo-box-input" theme-for="multiselect-combo-box-input">
    <template>
      <style include="material-field-button">
        :host {
          display: flex;
          outline: none;
        }

        :host(:not([has-value])) [part="clear-button"] {
          display: none;
        }

        :host::before,
        :host::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          transform-origin: 50% 0%;
          background-color: var(--material-text-field-input-line-background-color, #000);
          opacity: var(--_material-text-field-input-line-opacity, 0.42);
        }

        :host::after {
          background-color: var(--material-primary-color);
          opacity: 0;
          height: 2px;
          bottom: 0;
          transform: scaleX(0);
          transition: opacity 0.175s;
        }

        :host([disabled])::before {
          background-color: transparent;
          background-image: linear-gradient(90deg, var(--material-text-field-input-line-background-color, #000) 0, var(--material-text-field-input-line-background-color, #000) 2px, transparent 2px);
          background-size: 4px 1px;
          background-repeat: repeat-x;
        }

        :host([disabled]) [part="token-label"],
        :host([disabled]) [part="token-remove-button"],
        :host([disabled]) [part="compact-mode-label"] {
          pointer-events: none;
        }

        :host([disabled]) [part="token-label"],
        :host([disabled]) [part="compact-mode-label"] {
          color: var(--material-disabled-text-color);
          -webkit-text-fill-color: var(--material-disabled-text-color);
        }

        :host([disabled]) [part="token-remove-button"] {
          color: hsla(0, 0%, 100%, 0.75);
          -webkit-text-fill-color: hsla(0, 0%, 100%, 0.75);
        }

        [part="input-field"] {
          flex: 1 1;
          min-width: 80px;
          padding: 0;
          margin-bottom: 4px;
        }

        [part="compact-mode-label"] {
          display: flex;
          flex-grow: 1;
          align-items: center;
          margin: var(--material-space-s);
          color: var(--material-body-text-color);
          font-size: var(--material-body-font-size);
          cursor: default;
        }

        [part="tokens"] {
          display: flex;
          flex-wrap: wrap;
          flex-grow: 1;
          width: 100%;
          min-width: 0;
        }

        [part="token"] {
          display: flex;
          align-items: center;
          padding-left: var(--material-space-s);
          margin: var(--material-space-xs);
          border-radius: var(--material-border-radius);
          background-color: hsla(214, 53%, 23%, 0.1);

          cursor: default;
          white-space: nowrap;
          height: 26px;
          box-sizing: border-box;
        }

        [part="token-label"] {
          display: flex;
          align-items: center;
          font-size: var(--material-small-font-size);
        }

        /* reset definition from material field button */
        [part="token-remove-button"] {
          flex: none;
          width: 20px;
          height: 20px;
          padding: unset;
          padding-left: 4px;
          color: hsla(0, 0%, 100%, 0.9);
          font-size: inherit;
          line-height: 21px;
          text-align: unset;
        }

        [part="token-remove-button"]::before {
          content: var(--material-icons-clear);
          border-radius: 50%;
          background-color: hsla(214, 45%, 20%, 0.5);
        }

        [part="token-remove-button"]:hover {
          color: hsla(0, 0%, 100%, 0.9) !important;
        }

        [part="token-remove-button"]:hover::before {
          background-color: hsla(214, 41%, 17%, 0.83);
        }

        [part="clear-button"]::before {
          content: var(--material-icons-clear);
        }

        [part="toggle-button"]::before {
          content: var(--material-icons-dropdown);
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild($_documentContainer.content);
