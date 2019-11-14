import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {ControlStateMixin} from '@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ThemePropertyMixin} from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js';
import '@vaadin/vaadin-combo-box/src/vaadin-combo-box-light.js';
import {ComboBoxPlaceholder} from '@vaadin/vaadin-combo-box/src/vaadin-combo-box-placeholder.js';
import {MultiselectComboBoxMixin} from './multiselect-combo-box-mixin.js';
import './multiselect-combo-box-input.js';

{
  /**
   * `multiselect-combo-box`
   *
   * Multi select combo box based on the vaadin-combo-box
   *
   * @customElement
   * @polymer
   * @demo demo/index.html
   * @appliesMixin MultiselectComboBoxMixin
   */
  class MultiselectComboBox extends
    ControlStateMixin(
      ThemePropertyMixin(
        ThemableMixin(
          MultiselectComboBoxMixin(PolymerElement)))) {

    static get template() {
      return html`
        <style>
          :host {
            display: inline-flex;
          }

          :host([hidden]) {
            display: none !important;
          }

          :host::before {
            content: "\\2003";
            width: 0;
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
          }

          .multiselect-combo-box-container {
            display: flex;
            flex-direction: column;
            min-width: 100%;
            max-width: 100%;
          }

          [part="label"]:empty {
            display: none;
          }

          [part="combo-box"] {
            display: block;
            width: 100%;
            min-width: 0;
          }

          [part="combo-box"][hidden] {
            display: none;
          }

          [part="input-field"] {
            width: 100%;
            min-width: 0;
            position: relative;
          }

          :host([disabled]) [part="label"] {
            pointer-events: none;
          }

        </style>

        <div class="multiselect-combo-box-container">

          <label part="label">[[label]]</label>

          <div part="readonly-container" hidden\$="[[!readonly]]">
            [[_getReadonlyValue(selectedItems, itemLabelPath, compactMode)]]
          </div>

          <vaadin-combo-box-light
            id="comboBox"
            part="combo-box"
            hidden\$="[[readonly]]"
            items="[[items]]"
            item-id-path="[[itemIdPath]]"
            item-label-path="[[itemLabelPath]]"
            item-value-path="[[itemValuePath]]"
            on-change="_comboBoxValueChanged"
            disabled="[[disabled]]"
            pageSize="[[pageSize]]">

            <multiselect-combo-box-input
              id="input"
              class="input"
              part="input-field"
              placeholder="[[placeholder]]"
              item-label-path="[[itemLabelPath]]"
              items="[[selectedItems]]"
              compact-mode="[[compactMode]]"
              on-item-removed="_handleItemRemoved"
              on-remove-all-items="_handleRemoveAllItems"
              has-value="[[hasValue]]"
              has-label="[[hasLabel]]"
              theme\$="[[theme]]"
              disabled="[[disabled]]"
              clear-button-visible="[[clearButtonVisible]]">
            </multiselect-combo-box-input>
          </vaadin-combo-box-light>

          <div part="error-message" hidden\$="[[!invalid]]">[[errorMessage]]</div>

        </div>
      `;
    }

    static get is() {
      return 'multiselect-combo-box';
    }

    constructor() {
      super();
      this._boundCustomOverlaySelectedItemChanged = this._customOverlaySelectedItemChanged.bind(this);
    }

    ready() {
      super.ready();
      this.$.comboBox.renderer = this._customRenderer.bind(this);
      // replace listener to modify default behavior
      this.$.comboBox.$.overlay.removeEventListener('selection-changed', this.$.comboBox._boundOverlaySelectedItemChanged);
      this.$.comboBox.$.overlay.addEventListener('selection-changed', this._boundCustomOverlaySelectedItemChanged);
    }

    static get properties() {
      return {
        /**
         * The component label.
         */
        label: {
          type: String,
          value: '',
          observer: '_labelChanged'
        },

        /**
         * This attribute indicates that the component has a label.
         */
        hasLabel: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },

        /**
         * The title attribute.
         */
        title: {
          type: String,
          value: '',
          reflectToAttribute: true,
          readOnly: true
        },

        /**
         * The list of selected items.
         *
         * Note: modifying the selected items creates a new array each time.
         */
        selectedItems: {
          type: Array,
          value: () => [],
          notify: true
        },

        /**
         * This attribute specifies if the list of selected items should be kept ordered in ascending lexical order.
         *
         * If the `itemLabelPath` is specified, that value is used for ordering, otherwise the items themselves are
         * compared using `localCompare`.
         */
        ordered: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },

        /**
         * Number of items fetched at a time from the dataprovider. This property is delegated to the underlying `vaadin-combo-box`.
         */
        pageSize: {
          type: Number,
          value: 50,
          observer: '_pageSizeObserver'
        },

        /**
         * The `readonly` attribute.
         */
        readonly: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },

        /**
         * The `required` attribute.
         */
        required: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },

        /**
         * The `invalid` attribute.
         */
        invalid: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },

        /**
         * The `invalid` state error-message.
         */
        errorMessage: String
      };
    }

    static get observers() {
      return ['_selectedItemsObserver(selectedItems, selectedItems.*)'];
    }

    /**
     * Validates the component value.
     *
     * This method will set the components `valid` and `invalid` properties accordingly.
     */
    validate() {
      const valid = this.required ? this.hasValue : true;
      this.invalid = !valid;
      return valid;
    }

    _selectedItemsObserver(selectedItems) {
      this.hasValue = selectedItems && selectedItems.length > 0;

      if (this.ordered && !this.compactMode) {
        this._sortSelectedItems(selectedItems);
      }

      this._setTitle(this._getDisplayValue(selectedItems, this.itemLabelPath));

      this.$.comboBox.render && this.$.comboBox.render();
    }

    _dispatchChangeEvent() {
      this.dispatchEvent(new CustomEvent('change', {bubbles: true}));
    }

    _comboBoxValueChanged() {
      const item = this.$.comboBox.selectedItem;

      const update = this.selectedItems.slice(0);

      const index = this._findIndex(item, this.selectedItems, this.itemIdPath);

      if (index !== -1) {
        update.splice(index, 1);
        this._resetFocusedIndex();
      } else {
        update.push(item);
      }

      this.selectedItems = update;

      if (this._hasDataProvider()) {
        // When using a data provider we need to store the value of the `_focusedIndex`
        // in order to retain the overlay scroll position after the value is reset
        // (reseting the value sets the `_focusedIndex` to -1).
        // This ensures that on consecutive value selections, the overlay is opened
        // at the correct position in the list of items
        const focusedIndex = this.$.comboBox._focusedIndex;
        this.$.comboBox.value = null;
        this.$.comboBox._focusedIndex = focusedIndex;
      } else {
        // reset value
        this.$.comboBox.value = '';
      }

      if (this.validate()) {
        this._dispatchChangeEvent();
      }
    }

    _isSelected(item, selectedItems, itemIdPath) {
      return this._findIndex(item, selectedItems, itemIdPath) !== -1;
    }

    _findIndex(item, selectedItems, itemIdPath) {
      if (itemIdPath && item !== undefined) {
        for (let index = 0; index < selectedItems.length; index++) {
          if (selectedItems[index][itemIdPath] === item[itemIdPath]) {
            return index;
          }
        }
        return -1;
      } else {
        return selectedItems.indexOf(item);
      }
    }

    _handleItemRemoved(event) {
      const item = event.detail.item;
      const update = this.selectedItems.slice(0);
      update.splice(update.indexOf(item), 1);
      this.selectedItems = update;
      this._resetFocusedIndex();
      if (this.validate()) {
        this._dispatchChangeEvent();
      }
    }

    _handleRemoveAllItems() {
      this.set('selectedItems', []);
      this._resetFocusedIndex();
      if (this.validate()) {
        this._dispatchChangeEvent();
      }
    }

    _getReadonlyValue(selectedItems, itemLabelPath, compactMode) {
      return compactMode ?
        this._getCompactModeDisplayValue(selectedItems) :
        this._getDisplayValue(selectedItems, itemLabelPath);
    }

    _getDisplayValue(selectedItems, itemLabelPath) {
      return selectedItems.map(item => this._getItemDisplayValue(item, itemLabelPath)).join(', ');
    }

    get inputElement() {
      return this.$.input;
    }

    /**
     * Focusable element used by vaadin-control-state-mixin
     */
    get focusElement() {
      return this.inputElement;
    }

    /**
     * A custom renderer that adds the `multiselect` class to each `vaadin-combo-box-item`.
     */
    _customRenderer(root, comboBox, model) {
      let comboBoxItem = root.firstElementChild;
      let comboBoxItemContent;

      if (!comboBoxItem) {
        // build the template
        comboBoxItem = document.createElement('div');
        comboBoxItem.setAttribute('part', 'item-template');
        root.appendChild(comboBoxItem);

        comboBoxItemContent = document.createElement('span');
        comboBoxItem.appendChild(comboBoxItemContent);

        // attach class to host element
        const host = root.getRootNode().host;
        host.classList.add('multiselect');
      } else {
        comboBoxItemContent = comboBoxItem.firstElementChild;
      }

      // set/update item label
      comboBoxItemContent.textContent = this._getItemDisplayValue(model.item, this.itemLabelPath);

      // set/update selected attribute
      const selected = this._isSelected(model.item, this.selectedItems, this.itemIdPath);
      this._updateSelectedAttribute(comboBoxItem, selected);
    }

    _updateSelectedAttribute(element, selected) {
      if (selected) {
        element.setAttribute('selected', '');
      } else {
        element.removeAttribute('selected');
      }
    }

    _labelChanged(label) {
      if (label !== '' && label != null) {
        this.set('hasLabel', true);
      } else {
        this.set('hasLabel', false);
      }
    }

    _sortSelectedItems(selectedItems) {
      selectedItems.sort((item1, item2) => {
        const item1Str = this._getItemDisplayValue(item1, this.itemLabelPath);
        const item2Str = this._getItemDisplayValue(item2, this.itemLabelPath);
        return item1Str.localeCompare(item2Str);
      });
    }

    _pageSizeObserver(pageSize, oldPageSize) {
      if (Math.floor(pageSize) !== pageSize || pageSize <= 0) {
        this.pageSize = oldPageSize;
        throw new Error('`pageSize` value must be an integer > 0');
      }
      this.$.comboBox.pageSize = pageSize;
    }

    _hasDataProvider() {
      return this.$.comboBox.dataProvider && typeof this.$.comboBox.dataProvider === 'function';
    }

    _resetFocusedIndex() {
      this.$.comboBox._focusedIndex = -1; // reset focused index
    }

    _customOverlaySelectedItemChanged(event) {
      event.stopPropagation();

      if (event.detail.item instanceof ComboBoxPlaceholder) {
        return;
      }

      if (this.$.comboBox.opened) {
        this.$.comboBox.selectedItem = event.detail.item;
        this.$.comboBox._detectAndDispatchChange();
        this._resetFocusedIndex();
      }
    }
  }

  customElements.define(MultiselectComboBox.is, MultiselectComboBox);
}
