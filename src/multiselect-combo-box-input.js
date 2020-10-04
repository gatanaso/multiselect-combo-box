import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ThemePropertyMixin} from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js';
import '@vaadin/vaadin-text-field/src/vaadin-text-field.js';
import {MultiselectComboBoxMixin} from './multiselect-combo-box-mixin.js';

{
  /**
   * `multiselect-combo-box-input`
   *
   * @customElement
   * @polymer
   * @demo demo/index.html
   * @appliesMixin MultiselectComboBoxMixin
   */
  class MultiselectComboBoxInput extends
    ThemePropertyMixin(
      ThemableMixin(
        MultiselectComboBoxMixin(PolymerElement))) {

    static get template() {
      return html`
        <div id="tokens" part="tokens" slot="prefix">
          <template is="dom-if" if="[[compactMode]]" restamp="">
            <div part="compact-mode-label">[[_getCompactModeLabel(items, compactModeLabelGenerator, items.*)]]</div>
          </template>

          <template is="dom-if" if="[[!compactMode]]" restamp="">
            <template is="dom-repeat" items="[[items]]">
              <div part="token">
                <div part="token-label">[[_getItemLabel(item, itemLabelPath)]]</div>
                <div part="token-remove-button" role="button" on-click="_removeToken"></div>
              </div>
            </template>
          </template>

          <vaadin-text-field
            id="inputField"
            class="multiselect"
            part="input-field"
            value="{{value}}"
            placeholder="[[placeholder]]"
            on-keydown="_onKeyDown"
            multiselect-has-value\$="[[hasValue]]"
            multiselect-has-label\$="[[hasLabel]]"
            compact-mode\$="[[compactMode]]"
            theme\$="[[theme]]"
            disabled="[[disabled]]">

            <div
              id="clearButton"
              part="clear-button"
              slot="suffix"
              role="button"
              on-click="_removeAll"
              hidden\$="[[!clearButtonVisible]]">
            </div>

            <div id="toggleButton" part="toggle-button" slot="suffix" role="button"></div>
          </vaadin-text-field>
        </div>
      `;
    }

    static get is() {
      return 'multiselect-combo-box-input';
    }

    static get properties() {
      return {
        /**
         * The input field value.
         */
        value: {
          type: String,
          value: '',
          notify: true
        }
      };
    }

    _removeToken(event) {
      this._removeSelected(event.model.item);
      event.stopPropagation();
    }

    _onKeyDown(event) {
      if (event.keyCode === 8 && this.items.length && this.$.inputField.value === '') {
        this._removeSelected(this.items[this.items.length - 1]);
      }
    }

    _removeSelected(item) {
      this.dispatchEvent(new CustomEvent('item-removed', {
        composed: true,
        bubbles: true,
        detail: {
          item: item
        }
      }));
    }

    _removeAll(event) {
      event.stopPropagation();
      this.dispatchEvent(new CustomEvent('remove-all-items', {
        composed: true,
        bubbles: true
      }));
    }
  }

  customElements.define(MultiselectComboBoxInput.is, MultiselectComboBoxInput);
}
