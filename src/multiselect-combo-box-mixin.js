/**
 * @polymerMixin
 */
export const MultiselectComboBoxMixin = (base) =>
  class extends base {
    static get properties() {
      return {
        /**
         * A full set of items to filter the visible options from.
         * The items can be of either `String` or `Object` type.
         */
        items: {
          type: Array
        },

        /**
         * The item property used for a visual representation of the item.
         * @attr {string} item-label-path
         */
        itemLabelPath: {
          type: String
        }
      };
    }

    /**
     * Returns the item display label.
     * @protected
     */
    _getItemLabel(item, itemLabelPath) {
      return item && Object.prototype.hasOwnProperty.call(item, itemLabelPath) ? item[itemLabelPath] : item;
    }
  };
