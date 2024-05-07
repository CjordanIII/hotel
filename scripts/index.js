const form = document.querySelector("form");

/* 
room type :
king : max 5 ppl jun-aug 250, rest of year :150 (all per night)
queen : max 2 ppl jun-aug 250, rest of year :150(all per night)
2 bedroom: 6 ppl jun-aug 350, rest of year :210(all per night)

*/

form.addEventListener("submit", result);
function result(e) {
  e.preventDefault();
  const date_range_from = new Date(
    form.date_range_from.value + "T00:00:00"
  ).toLocaleString();
  const numOfnights = form.num_of_nights.value;
  const roomType = form.room_type.value;
  const discount = form.discount.value;
  console.log(discount);
  const roomRate = getRoomRate(
    date_range_from,
    numOfnights,
    roomType,
    discount
  );
  //  returns the object bellow
  const result = document.querySelector("#result");

  // maxPeople: maxPpl,
  // roomRate: beforeTaxes,
  // discount: discount * 100,
  // moneyOff: moneyOff.toString(),
  // tax: roomRate,
  // total: total,

  const amountOfPeople =
    parseInt(form.adults.value) + parseInt(form.children.value);
  //  to many people check
  if (roomRate.maxAmountOfPeople <= amountOfPeople) {
    alert("you have to many people");
  } else {
    result.innerHTML = `
  <div class="alert alert-success">
  <h4> Base Price $${roomRate.price}</h4>
    <h4>Your room rate is: $${roomRate.roomRate}</h4>
    ${
      roomRate.discount
        ? `<h4>Your discount is: ${roomRate.discount}%</h4>`
        : ""
    }
    <h4>Your tax is: $${roomRate.tax}</h4>
    <h4>Your total is: $${roomRate.total}</h4>
    ${roomRate.moneyOff ? `<h4>You save $${roomRate.moneyOff}</h4>` : ""}
  </div>
`;
  }
}
// , roomType, checkoutDate
function getRoomRate(checkinDate, numOfnights, roomType, discount) {
  const month = checkinDate.split("/")[0];

  let roomRate;
  let maxPeople;
  let baseRateOfroom;
  let moneyOff;
  let price;

  //  special month
  if (numOfnights >= 1 && month >= 6 && month <= 8) {
    switch (roomType) {
      case "queen":
        roomRate = 250 * numOfnights;
        price = roomRate;
        break;
        if (discount >= 0) {
          moneyOff = roomRate * discount;
          roomRate = roomRate - moneyOff;
        }

        maxPeople = 5;

        break;
      case "king":
        roomRate = 250 * numOfnights;
        price = roomRate;
        if (discount >= 0) {
          moneyOff = roomRate * discount;
          roomRate = roomRate - moneyOff;
        }

        maxPeople = 2;
        break;
      case "two_bed_room":
        roomRate = 350 * numOfnights;
        price = roomRate;
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
      switch (roomType) {
        case "queen":
          roomRate = 150 * numOfnights;
          price = roomRate;
          if (discount >= 0) {
            moneyOff = roomRate * discount;
            roomRate = roomRate - moneyOff;
          }

          maxPeople = 5;

          break;
        case "king":
          roomRate = 150 * numOfnights;
          price = roomRate;
          if (discount >= 0) {
            moneyOff = roomRate * discount;
            roomRate = roomRate - moneyOff;
          }

          maxPeople = 2;
          break;
        case "two_bed_room":
          roomRate = 210 * numOfnights;
          price = roomRate;
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
    }
  }
  // after extra cost calculation
  const tax = 0.12;
  const beforeTaxes = roomRate;
  roomRate = roomRate * tax;

  const total = beforeTaxes + roomRate;
  const maxPpl = range(maxPeople);

  const obj = {
    maxPeople: maxPpl,
    maxAmountOfPeople: maxPeople,
    roomRate: beforeTaxes,
    price: price,
    discount: discount * 100,
    moneyOff: moneyOff.toString(),
    tax: roomRate,
    total: total,
  };
  return obj;
}
//  how many people are allowed in each room calculation
//dont know what do use this for
function range(size, startAt = 1) {
  return [...Array(size).keys()].map((i) => i + startAt);
}
