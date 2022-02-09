import { InputContainer } from '@vaadin/input-container/src/vaadin-input-container.js';
import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

registerStyles(
  'multiselect-combo-box-container',
  css`
    [part='wrapper'] {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  `,
  {
    moduleId: 'vaadin-multiselect-combo-box-container-styles'
  }
);

let memoizedTemplate;

/**
 * An element used internally by `<multiselect-combo-box>`. Not intended to be used separately.
 *
 * @extends InputContainer
 * @private
 */
class MultiselectComboBoxContainer extends InputContainer {
  static get is() {
    return 'multiselect-combo-box-container';
  }

  static get template() {
    if (!memoizedTemplate) {
      memoizedTemplate = super.template.cloneNode(true);
      const content = memoizedTemplate.content;
      const slots = content.querySelectorAll('slot');

      const wrapper = document.createElement('div');
      wrapper.setAttribute('part', 'wrapper');
      content.insertBefore(wrapper, slots[2]);

      wrapper.appendChild(slots[0]);
      wrapper.appendChild(slots[1]);
    }
    return memoizedTemplate;
  }
}

customElements.define(MultiselectComboBoxContainer.is, MultiselectComboBoxContainer);
