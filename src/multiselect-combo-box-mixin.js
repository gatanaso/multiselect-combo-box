/**
 * @polymerMixin
 */
export const MultiselectComboBoxMixin = (base) => class extends base {

  static get properties() {
    return {
      /**
       * The list of items.
       */
      items: Array,

      /**
       * The input placeholder.
       */
      placeholder: {
        type: String,
        value: ''
      },

      /**
       * This attribute indicates that the component has a value.
       */
      hasValue: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
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
       * This attribute indicates that the component is rendered in 'compact mode'.
       * In this mode, the component displays the number of items currently selected.
       */
      compactMode: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * Custom function for generating the display label when in compact mode.
       *
       * This function receives the array of selected items and should return
       * a string value that will be used as the display label.
       */
      compactModeLabelGenerator: Function,

      /**
       * The item property to be used as the `label` in combo-box.
       */
      itemLabelPath: String,

      /**
       * The item property to be used as the `value` of combo-box.
       */
      itemValuePath: String,

      /**
       * Path for the id of the item. If `items` is an array of objects,
       * the `itemIdPath` is used to compare and identify the same item
       * in `selectedItem`.
       */
      itemIdPath: String,

      /**
       * The theme name attribute.
       * Used to communicate theme information to
       * component internals (currently used for the material theme).
       */
      theme: String,

      /**
       * Set to true to disable this element.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * Set to true to display the clear icon which clears the input.
       */
      clearButtonVisible: {
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Returns the item display label.
   * @protected
   */
  _getItemLabel(item, itemLabelPath) {
    return item && item.hasOwnProperty(itemLabelPath) ? item[itemLabelPath] : item;
  }

  /**
   * Retrieves the component display label when in compact mode.
   * @protected
   */
  _getCompactModeLabel(items) {
    if (this.compactModeLabelGenerator && typeof this.compactModeLabelGenerator === 'function') {
      return this.compactModeLabelGenerator(items);
    } else {
      const suffix = (items.length === 0 || items.length > 1) ? 'values' : 'value';
      return `${items.length} ${suffix}`;
    }
  }
};
