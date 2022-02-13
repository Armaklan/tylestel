import { LitElement, css, html } from "https://unpkg.com/lit?module";
import { htmlObjectConverter } from "../converter.js";
import { buttonCss, cardCss, icons } from "../cssCommun.js";
import { unsafeHTML } from "https://unpkg.com/lit-html@2.1.3/directives/unsafe-html.js?module"

export class ArmureList extends LitElement {
  static properties = {
    actorId: { type: String },
    armures: {
      converter: htmlObjectConverter,
    },
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .delete-btn,
    .edit-btn {
      max-width: 2rem;
    }

    ${buttonCss}
    ${cardCss}
    ${icons}

    .card article {
      flex-direction: column;
    }

    .attribut-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  `;

  constructor() {
    super();
    this.modeSelection = false;
  }

  render() {
    return html` ${this.armures.map((p) => this.renderArmure(p))} `;
  }

  renderArmure(item) {
    return html`
      <section class="card">
        <header>
          <span>${item.name}</span>
          <span>
            <button
              class="edit-btn"
              title="Editer"
              data-manoeuvre="${item._id}"
              @click=${this.editItem}
              type="button"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="delete-btn"
              title="Supprimer"
              data-manoeuvre="${item._id}"
              @click=${this.deleteItem}
              type="button"
            >
              <i class="fas fa-trash"></i>
            </button>
          </span>
        </header>
        <article>
          <div class="attribut-container">
            <span><b>Résistance : </b> ${item.data.resistance}</span>
          </div>
          <div>${unsafeHTML(item.data.description)}</div>
        </article>
      </section>
    `;
  }

  deleteItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);

    actor.deleteEmbeddedDocuments("Item", manoeuvreId);
  }

  editItem(event) {
    const manoeuvreId = event.currentTarget.dataset.manoeuvre;
    const actor = game.actors.get(this.actorId);
    const item = actor.items.get(manoeuvreId);
    item.sheet.render(true);
  }
}

export function declareArmureList() {
  customElements.define("armure-list", ArmureList);
}
