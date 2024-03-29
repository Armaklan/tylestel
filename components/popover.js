import {
  LitElement,
  css,
  html,
} from "https://unpkg.com/lit@2.1.3?module";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class Manoeuvre extends LitElement {
  static properties = {
    content: { type: String },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .popover {
      box-sizing: border-box;
      opacity: 0;
      visibility: hidden;
      position: absolute;
      background-color: #f3f3f3;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px,
        rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
        rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
      border-radius: 0.25rem;
      padding: 0.2rem 0.6rem;
      height: fit-content;
      top: -120%;
      font-size: 0.8rem;
      width: 86%;
      left: 4%;
      transition: all 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
      z-index: 10;
    }

    .popover:after {
      position: absolute;
      z-index: -1;
      content: "";
      right: calc(50% - 10px);
      top: 100%;
      border-style: solid;
      border-width: 10px 10px 0px 10px;
      border-color: #f3f3f3 transparent transparent transparent;
      transition: all 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
    }

    :host {
      display: block;
      position: relative;
    }
    :host(:hover) .popover {
      opacity: 1;
      visibility: visible;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <slot></slot>
      ${this.renderPopover()}
    `;
  }

  renderPopover() {
    if (this.content) {
      return html`<div class="popover">${unsafeHTML(this.content)}</div>`;
    }
    return "";
  }
}

export function declarePopover() {
  customElements.define("ty-popover", Manoeuvre);
}
