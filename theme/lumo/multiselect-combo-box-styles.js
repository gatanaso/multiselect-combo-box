import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/mixins/required-field.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = // eslint-disable-line camelcase
html`
  <dom-module id="lumo-multiselect-combo-box" theme-for="multiselect-combo-box">
    <template>
      <style include="lumo-required-field">

        :host {
          outline: none;
          --lumo-text-field-size: var(--lumo-size-m);
          color: var(--lumo-body-text-color);
          font-size: var(--lumo-font-size-m);
          font-family: var(--lumo-font-family);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
          padding: var(--lumo-space-xs) 0;
        }

        :host::before {
          content: "\\2003";
          width: 0;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
        }

        :host([focused]:not([readonly]):not([disabled])) [part="label"] {
          color: var(--lumo-primary-text-color);
        }

        :host(:hover:not([readonly]):not([focused]):not([disabled])) [part="label"] {
          color: var(--lumo-body-text-color);
        }

        :host([disabled]) [part="label"] {
          color: var(--lumo-disabled-text-color);
          -webkit-text-fill-color: var(--lumo-disabled-text-color);
        }

        [part="input-field"] {
          background-color: var(--lumo-contrast-10pct);
        }

        :host(:hover:not([readonly]):not([focused]):not([disabled])) [part="input-field"]::after {
          opacity: 0.1;
        }

        [part="input-field"]::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: inherit;
          pointer-events: none;
          background-color: var(--lumo-contrast-50pct);
          opacity: 0;
          transition: transform 0.15s, opacity 0.2s;
          transform-origin: 100% 0;
        }

        :host([invalid]) [part="input-field"] {
          background-color: var(--lumo-error-color-10pct);
        }

        /* Trigger when not focusing using the keyboard */
        :host([focused]:not([focus-ring]):not([readonly])) [part="input-field"]::after {
          transform: scaleX(0);
          transition-duration: 0.2s, 1s;
        }

        [part="readonly-container"]:not([hidden]) {
          display: inline-flex;
          align-items: center;
          color: var(--lumo-secondary-text-color);
          border: 1px dashed var(--lumo-contrast-30pct);
          border-radius: var(--lumo-border-radius);
          padding: 0 calc(0.375em + var(--lumo-border-radius) / 4 - 1px);
          font-weight: 500;
          min-height: var(--lumo-text-field-size);
          cursor: default;
        }
      </style>
    </template>
  </dom-module>

  <dom-module id="lumo-combo-box-item-theme" theme-for="vaadin-combo-box-item">
    <template>
      <style>
        [part="content"] {
          font-size: var(--lumo-font-size-s);
        }
      </style>
    </template>
  <dom-module>

  <dom-module id="lumo-input-field-theme" theme-for="vaadin-text-field">
    <template>
      <style>
        :host(.multiselect) [part="input-field"],
        :host(.multiselect) [part="input-field"]::after {
          background-color: transparent !important;
          box-shadow: none;
        }

        :host(.multiselect[compact-mode]) [part="input-field"] {
          cursor: default;
        }

        :host(.multiselect[compact-mode]) [part="input-field"]::after {
          border: none;
        }

        :host(.multiselect[compact-mode]) [part="input-field"] [part="value"] {
          visibility: hidden;
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild($_documentContainer.content);
