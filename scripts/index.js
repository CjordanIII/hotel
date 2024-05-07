const form = document.querySelector("form");

/* 
room type :
king : max 5 ppl jun-aug 250, rest of year :150 (all per night)
queen : max 2 ppl jun-aug 250, rest of year :150(all per night)
2 bedroom: 6 ppl jun-aug 350, rest of year :210(all per night)

*/

form.addEventListener("submit", logger);
function logger(e) {
  e.preventDefault();
  const date_range_from = new Date(
    form.date_range_from.value + "T00:00:00"
  ).toLocaleString();
  const numOfnights = form.num_of_nights.value;
  const roomType = form.room_type.value;

  getRoomRate(date_range_from, numOfnights, roomType);
}
// , roomType, checkoutDate
function getRoomRate(checkinDate, numOfnights, roomType) {
  const month = checkinDate.split("/")[0];

  let roomRate;
  let maxPeople;
  let discount;
  let moneyOff;

  //  special month
  if (numOfnights >= 1 && month >= 6 && month <= 8) {
    switch (roomType) {
      case "queen":
        if (numOfnights >= 1 && month >= 6 && month <= 8) {
          roomRate = 250 * numOfnights;
        }

        if (discount >= 0) {
          moneyOff = roomRate * discount;
          roomRate = roomRate - moneyOff;
        }

        maxPeople = 5;

        break;
      case "king":
        if (numOfnights >= 1 && month >= 6 && month <= 8) {
          roomRate = 250 * numOfnights;
        }
        if (discount >= 0) {
          moneyOff = roomRate * discount;
          roomRate = roomRate - moneyOff;
        }

        maxPeople = 2;
        break;
      case "two_bed_room":
        if (numOfnights >= 1 && month >= 6 && month <= 8) {
          roomRate = 350 * numOfnights;
        }
        if (discount >= 0) {
          moneyOff = roomRate * discount;
          roomRate = roomRate - moneyOff;
        }
        maxPeople = 6;
        break;
      default:
        console.log("default");
        break;
    }
  } else {
    if (numOfnights >= 1) {
      roomRate = 150 * numOfnights;
    }
  }
  const tax = 0.12;
  const beforeTaxes = roomRate;
  roomRate = roomRate * tax;
  const total = beforeTaxes + roomRate;
  console.log(beforeTaxes);
  console.log(total);
}
// getRoomRate(checkinDate, roomType, checkoutDate);
