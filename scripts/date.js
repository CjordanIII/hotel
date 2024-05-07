const magicnum = "10/21/2024";

const month = magicnum.split("/")[0];
let totalcost = 150;
if (month >= 6 && month <= 8) {
  totalcost = 350;
  console.log(month);
}

console.log(totalcost);
