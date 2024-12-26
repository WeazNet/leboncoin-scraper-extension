const adTitle =
  document.querySelector('[data-qa-id="adview_title"]')?.textContent ?? "";
const adPrice =
  parseInt(
    document
      .querySelector('[data-qa-id="adview_price"]')
      ?.getElementsByTagName("p")[0]
      ?.textContent.slice(0, -2)
      .replace(/\s/g, "")
  ) || -1;
const adBrand =
  document
    .querySelector('[data-qa-id="criteria_item_u_car_brand"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adModel =
  document
    .querySelector('[data-qa-id="criteria_item_u_car_model"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adYear =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_regdate"]')
      ?.getElementsByTagName("p")[1]
      ?.textContent.toLowerCase()
  ) || -1;
const adIssuanceDate =
  document
    .querySelector('[data-qa-id="criteria_item_issuance_date"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adMileage =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_mileage"]')
      ?.getElementsByTagName("p")[1]
      ?.textContent.slice(0, -3)
  ) || 0;
const adFuel =
  document
    .querySelector('[data-qa-id="criteria_item_fuel"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adGearbox =
  document
    .querySelector('[data-qa-id="criteria_item_gearbox"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adType =
  document
    .querySelector('[data-qa-id="criteria_item_vehicle_type"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adColor =
  document
    .querySelector('[data-qa-id="criteria_item_vehicule_color"]')
    ?.getElementsByTagName("p")[1]
    ?.textContent.toLowerCase() ?? "";
const adNbDoors =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_doors"]')
      ?.getElementsByTagName("p")[1]?.textContent
  ) || 0;
const adNbSeats =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_seats"]')
      ?.getElementsByTagName("p")[1]
      ?.textContent.toLowerCase()
  ) || 0;
const adHorsepower =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_horsepower"]')
      ?.getElementsByTagName("p")[1]
      ?.textContent.slice(0, -3)
  ) || 0;
const adHorsepowerDIN =
  parseInt(
    document
      .querySelector('[data-qa-id="criteria_item_horse_power_din"]')
      ?.getElementsByTagName("p")[1]
      ?.textContent.slice(0, -3)
  ) || 0;

const adSaddlery =
  document
    .querySelector('[data-qa-id="criteria_item_vehicle_upholstery"]')
    ?.getElementsByTagName("p")[1]?.textContent ?? "";

// Extraction de la description de l'annonce
const adDescription =
  document
    .querySelector('[data-qa-id="adview_description_container"]')
    ?.getElementsByTagName("p")[0]?.textContent ?? "";

let adOptions = [];
const regex = /option(?:s)?\s*([\s\S]*?)etc/i;
const match = regex.exec(adDescription);
if (match) {
  const optionsTexte = match[1].trim();
  adOptions = optionsTexte.split("\n");
  adOptions.shift();
}

let adImages = [];
const imgContainer = document.querySelectorAll(".slick-slide");
for (let i = 1; i < imgContainer.length / 2; i++) {
  adImages.push(imgContainer[i].querySelector("img").src);
}

const data = {
  title: adTitle,
  price: adPrice,
  brand: adBrand,
  model: adModel,
  year: adYear,
  issuanceDate: adIssuanceDate,
  mileage: adMileage,
  fuel: adFuel,
  gearbox: adGearbox,
  saddlery: adSaddlery,
  type: adType,
  color: adColor,
  nbDoors: adNbDoors,
  nbSeats: adNbSeats,
  horsepower: adHorsepower,
  horsepowerDIN: adHorsepowerDIN,
  description: adDescription,
  images: adImages,
  options: adOptions,
};
data;
