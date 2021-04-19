declare type Theme = 'lumo' | 'material';

declare function MultiselectComboBoxMixin<T extends new (...args: any[]) => {}>(
  base: T,
): T & MultiselectComboBoxMixinConstructor<T>;

interface MultiselectComboBoxMixinConstructor<T> {
  new (...args: any[]): MultiselectComboBoxMixin<T>;
}

declare interface MultiselectComboBoxMixin<T = unknown> {
  items: T[];
  placeholder?: string;
  hasValue?: boolean;
  hasLabel?: boolean;
  compactMode?: boolean;
  compactModeLabelGenerator: (selectedItems: T[]) => string;
  itemLabelPath: string;
  itemValuePath: string;
  itemIdPath: string;
  theme: Theme;
  disabled?: boolean;
  clearButtonVisible?: boolean;
}

export { MultiselectComboBoxMixin, MultiselectComboBoxMixinConstructor };
