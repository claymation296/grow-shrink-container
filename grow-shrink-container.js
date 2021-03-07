
/**
  * `grow-shrink-container`
  * 
  *
  * @customElement
  * @polymer
  * @demo demo/index.html
  *
  *
  **/


import {AppElement, html} from '@longlost/app-core/app-element.js';
import {schedule, wait}   from '@longlost/app-core/utils.js';
import htmlString         from './grow-shrink-container.html';
import '@longlost/app-core/app-shared-styles.js';


class GrowShrinkContainer extends AppElement {

  static get is() { return 'grow-shrink-container'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _closeBusy: Boolean,

      _openBusy: Boolean

    };
  }


  async close() {

    if (this._closeBusy) { return; }

    this._closeBusy = true; 

    this.$.container.classList.remove('delayed-transition');
    this.$.container.classList.remove('open');
    this.$.xWrapper.classList.add('delay');
    this.$.yWrapper.classList.remove('delay');

    await wait(200);

    this.$.yWrapper.classList.remove('open');
    this.$.xWrapper.classList.remove('open');

    await wait(250);

    this.style['display'] = 'none';

    this._cached    = undefined;
    this._closeBusy = false;
  }


  async open() {

    if (this._openBusy) { return; }

    this._openBusy = true;

    this.style['display'] = 'block';

    this.$.xWrapper.classList.remove('delay');
    this.$.yWrapper.classList.add('delay');
    this.$.container.classList.add('delayed-transition');

    await schedule();

    this.$.xWrapper.classList.add('open');
    this.$.yWrapper.classList.add('open');
    this.$.container.classList.add('open');

    await wait(250);

    this._openBusy = false;
  }

}

window.customElements.define(GrowShrinkContainer.is, GrowShrinkContainer);
