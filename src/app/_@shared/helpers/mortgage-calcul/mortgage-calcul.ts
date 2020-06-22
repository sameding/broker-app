export const calculateMortgage = (amount: number, rate:number, amortization:number) => {
  let mer = Math.pow((1+rate/2), (1/6)-1);
  let payment = amount * (mer/(1- Math.pow((1+mer), -amortization*12)));
  return payment;
}
