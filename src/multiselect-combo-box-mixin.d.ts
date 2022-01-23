import { Constructor } from '@open-wc/dedupe-mixin';

export declare function MultiselectComboBoxMixin<TItem, T extends Constructor<HTMLElement>>(
  base: T
): T & Constructor<MultiselectComboBoxMixinClass<TItem>>;

export declare class MultiselectComboBoxMixinClass<TItem> {
  /**
   * A full set of items to filter the visible options from.
   * The items can be of either `String` or `Object` type.
   */
  items: Array<TItem> | undefined;

  /**
   * The item property used for a visual representation of the item.
   * @attr {string} item-label-path
   */
  itemLabelPath: string;
}
