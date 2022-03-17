export default class FamilierSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sheet", "item", "tylestel", "familier"],
      template: "systems/tylestel/templates/sheet/familier.html",
      width: 500,
      height: 400,
    });
  }

  /** @override */
  getData() {
    const sheetData = super.getData();
    console.log("Tylestel | Initializing familier data");
    console.debug(sheetData);

    return sheetData;
  }
}
