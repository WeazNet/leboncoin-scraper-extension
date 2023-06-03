const adTitle = document.getElementsByClassName("_1hnil _35DXM _1-TTU")[0].textContent;
const adPrice = document.querySelector('[data-qa-id="adview_price"]').getElementsByTagName("span")[0].textContent.slice(0, -2).replace(/\s/g, '');
let date_a = document.querySelector('[data-qa-id="adview_date"]').textContent;
let dateParts = date_a.split(" à ");
const adDate = dateParts[0].split("/").reverse().join("-") + "T" + dateParts[1] + ":00";
const adBrand = document.querySelector('[data-qa-id="criteria_item_u_car_brand"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adModel = document.querySelector('[data-qa-id="criteria_item_u_car_model"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adYear = document.querySelector('[data-qa-id="criteria_item_regdate"]').getElementsByTagName("span")[0].textContent.toLowerCase();

const adIssuanceDate = document.querySelector('[data-qa-id="criteria_item_issuance_date"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adMileage = document.querySelector('[data-qa-id="criteria_item_mileage"]').getElementsByTagName("span")[0].textContent.slice(0, -3);
const adFuel = document.querySelector('[data-qa-id="criteria_item_fuel"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adGearbox = document.querySelector('[data-qa-id="criteria_item_gearbox"]').getElementsByTagName("span")[0].textContent.toLowerCase();

const adType = document.querySelector('[data-qa-id="criteria_item_vehicle_type"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adColor = document.querySelector('[data-qa-id="criteria_item_vehicule_color"]').getElementsByTagName("span")[0].textContent.toLowerCase();

const adNbDoors = document.querySelector('[data-qa-id="criteria_item_doors"]').getElementsByTagName("span")[0].textContent;
const adNbSeats = document.querySelector('[data-qa-id="criteria_item_seats"]').getElementsByTagName("span")[0].textContent.toLowerCase();
const adHorsepower = document.querySelector('[data-qa-id="criteria_item_horsepower"]').getElementsByTagName("span")[0].textContent.slice(0, -3);
const adHorsepowerDIN = document.querySelector('[data-qa-id="criteria_item_horse_power_din"]').getElementsByTagName("span")[0].textContent.slice(0, -3);
const adDescription = document.querySelector('[data-qa-id="adview_description_container"]').getElementsByTagName("p")[0].textContent;

let adImages= [];
let adOptions = []; 

let checkImages = document.querySelector('[data-qa-id="adview_spotlight_container"]').getElementsByTagName("button")[0];
checkImages.click();


const regex = /option(?:s)?\s*([\s\S]*?)etc/i;

const match = regex.exec(adDescription);
if(match)
{
  const optionsTexte = match[1].trim();
  adOptions = optionsTexte.split('\n');
  adOptions.shift();
}


const data = {
  title: adTitle,
  price: adPrice,
  date: adDate,
  brand: adBrand,
  model: adModel,
  year: adYear,
  issuanceDate: adIssuanceDate,
  mileage: adMileage,
  fuel: adFuel,
  gearbox: adGearbox,
  type: adType,
  color: adColor,
  nbDoors: adNbDoors,
  nbSeats: adNbSeats,
  horsepower: adHorsepower,
  horsepowerDIN: adHorsepowerDIN,
  description: adDescription,
  images:adImages,
  options:adOptions,
};

data;