import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {ControlStateMixin} from '@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js';
import {ThemableMixin} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import {ThemePropertyMixin} from '@vaadin/vaadin-themable-mixin/vaadin-theme-property-mixin.js';
import {ComboBoxPlaceholder} from '@vaadin/vaadin-combo-box/src/vaadin-combo-box-placeholder.js';
import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import {MultiselectComboBoxMixin} from './multiselect-combo-box-mixin.js';

import '@vaadin/vaadin-combo-box/src/vaadin-combo-box-light.js';
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
          MultiselectComboBoxMixin(mixinBehaviors([IronResizableBehavior], PolymerElement))))) {

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
            [[_getReadonlyValue(selectedItems, itemLabelPath, compactMode, readonlyValueSeparator)]]
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
            page-size="[[pageSize]]"
            filter="{{filterValue}}"
            filtered-items="[[filteredItems]]"
            allow-custom-value="[[allowCustomValues]]"
            on-custom-value-set="_handleCustomValueSet">

            <multiselect-combo-box-input
              id="input"
              class="input"
              part="input-field"
              placeholder="[[placeholder]]"
              item-label-path="[[itemLabelPath]]"
              items="[[selectedItems]]"
              compact-mode="[[compactMode]]"
              compact-mode-label-generator="[[compactModeLabelGenerator]]"
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

      // replace listener to modify default behavior
      this.$.comboBox.$.overlay.removeEventListener('selection-changed', this.$.comboBox._boundOverlaySelectedItemChanged);
      this.$.comboBox.$.overlay.addEventListener('selection-changed', this._boundCustomOverlaySelectedItemChanged);

      // modify check to allow custom renderers
      this.$.comboBox.$.overlay._isItemSelected = this._customIsSelected.bind(this);

      this._observer = new FlattenedNodesObserver(this, (info) => {
        this._setTemplateFromNodes(info.addedNodes);
      });

      this._notifyReady(); // only relevant when used with Vaadin Flow
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
          reflectToAttribute: true
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
         * Number of items fetched at a time from the dataprovider.
         *
         * This property is delegated to the underlying `vaadin-combo-box`.
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
        errorMessage: String,

        /**
         * The join separator used for the 'display value' when in read-only mode.
         */
        readonlyValueSeparator: {
          type: String,
          value: ', ' // default value
        },

        /**
         * If `true`, the user can input a value that is not present in the items list.
         * `value` property will be set to the input value in this case.
         *
         * This property is delegated to the underlying `vaadin-combo-box`.
         */
        allowCustomValues: {
          type: Boolean,
          value: false
        },

        /**
         * Custom function for rendering the content of every item.
         * Receives three arguments:
         *
         * - `root` The `<vaadin-combo-box-item>` internal container DOM element.
         * - `comboBox` The reference to the `<vaadin-combo-box>` element.
         * - `model` The object with the properties related with the rendered
         *   item, contains:
         *   - `model.index` The index of the rendered item.
         *   - `model.item` The item.
         */
        renderer: Function,

        _itemTemplate: Object,

        /**
         * Filtering string the user has typed into the input field.
         */
        filterValue: {
          type: String,
          value: '',
          notify: true
        },

        /**
         * A subset of items, filtered based on the user input. Filtered items
         * can be assigned directly to omit the internal filtering functionality.
         * The items can be of either `String` or `Object` type.
         */
        filteredItems: Array
      };
    }

    static get observers() {
      return [
        '_selectedItemsObserver(selectedItems, selectedItems.*)',
        '_templateOrRendererChanged(_itemTemplate, renderer)',
        '_observeOffsetHeight(errorMessage, invalid, label)'
      ];
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

      this.compactMode && (this.title = this._getDisplayValue(selectedItems, this.itemLabelPath, ', '));

      // manually force a render
      this.$.comboBox.$.overlay._selectedItem = {};

      setTimeout(() => this._notifyResizeIfNeeded(), 0);
    }

    _templateOrRendererChanged(template, renderer) {
      this.$.comboBox._itemTemplate = template;
      this.$.comboBox.renderer = renderer;
    }

    _observeOffsetHeight() {
      this._notifyResizeIfNeeded();
    }

    _dispatchChangeEvent() {
      this.dispatchEvent(new CustomEvent('change', {bubbles: true}));
    }

    _comboBoxValueChanged(event, selectedItem) {
      const item = selectedItem || this.$.comboBox.selectedItem;
      if (!item) {
        return;
      }

      const update = this.selectedItems.slice(0);
      const index = this._findIndex(item, this.selectedItems, this.itemIdPath);
      if (index !== -1) {
        update.splice(index, 1);
      } else {
        update.push(item);
      }

      if (!selectedItem) {
        this.$.comboBox.value = null;
      }

      this.selectedItems = update;

      if (this.validate()) {
        this._dispatchChangeEvent();
      }

      // reset the focus index, so a value-change event
      // is not fired when the overlay is closed
      this.$.comboBox._focusedIndex = -1;
    }

    _handleCustomValueSet(event) {
      event.preventDefault();
      if (event.detail) {
        this.$.input.value = null; // clear input
        const customValuesSetEvent = new CustomEvent('custom-values-set', {
          detail: event.detail,
          composed: true,
          cancelable: true,
          bubbles: true
        });
        this.dispatchEvent(customValuesSetEvent);
      }
    }

    _customIsSelected(item, selectedItem, itemIdPath) {
      if (item instanceof ComboBoxPlaceholder) {
        return false;
      }
      return this._isSelected(item, this.selectedItems, itemIdPath);
    }

    _isSelected(item, selectedItems, itemIdPath) {
      return this._findIndex(item, selectedItems, itemIdPath) !== -1;
    }

    _findIndex(item, selectedItems, itemIdPath) {
      if (itemIdPath && item) {
        for (let index = 0; index < selectedItems.length; index++) {
          if (selectedItems[index] && selectedItems[index][itemIdPath] === item[itemIdPath]) {
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
      if (this.validate()) {
        this._dispatchChangeEvent();
      }
    }

    _handleRemoveAllItems() {
      this.set('selectedItems', []);
      if (this.validate()) {
        this._dispatchChangeEvent();
      }
    }

    _getReadonlyValue(selectedItems, itemLabelPath, compactMode, readonlyValueSeparator) {
      return compactMode ?
        this._getCompactModeLabel(selectedItems) :
        this._getDisplayValue(selectedItems, itemLabelPath, readonlyValueSeparator);
    }

    _getDisplayValue(selectedItems, itemLabelPath, valueSeparator) {
      return selectedItems.map(item => this._getItemLabel(item, itemLabelPath)).join(valueSeparator);
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

    _labelChanged(label) {
      this.set('hasLabel', label !== '' && label != null);
    }

    _sortSelectedItems(selectedItems) {
      selectedItems.sort((item1, item2) => {
        const item1Str = String(this._getItemLabel(item1, this.itemLabelPath));
        const item2Str = String(this._getItemLabel(item2, this.itemLabelPath));
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

    _customOverlaySelectedItemChanged(event) {
      event.stopPropagation();

      if (event.detail.item instanceof ComboBoxPlaceholder) {
        return;
      }

      if (this.$.comboBox.opened) {
        this._comboBoxValueChanged(event, event.detail.item);

        // When custom values are allowed, we need to clear the input,
        // so we don't fire a custom values event
        if (this.allowCustomValues) {
          this.$.input.value = null;
        }
      }
    }

    _setTemplateFromNodes(nodes) {
      this._itemTemplate = nodes.filter(node => node.localName && node.localName === 'template')[0] || this._itemTemplate;
    }

    _notifyReady() {
      this.$server && this.$server.notifyReady();
    }


    _notifyResizeIfNeeded() {
      if (this.__previousHeight !== undefined && this.__previousHeight !== this.offsetHeight) {
        this.notifyResize(); // allows the items drop-down to reposition itself if needed
        this.dispatchEvent(new CustomEvent('iron-resize', {bubbles: true})); // allows i.e. vaadin-grid to resize itself
      }
      this.__previousHeight = this.offsetHeight;
    }
  }

  customElements.define(MultiselectComboBox.is, MultiselectComboBox);
}
