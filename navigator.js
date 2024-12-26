document
  .querySelector('[data-qa-id="adview_description_container"]')
  .getElementsByTagName("button")[0]
  .click();

for (let i = 0; i < document.querySelectorAll("button").length; i++) {
  if (document.querySelectorAll("button")[i].textContent.startsWith("Voir les"))
    document.querySelectorAll("button")[i].click();
}
