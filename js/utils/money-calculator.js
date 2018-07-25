const normalizeAmount = result => parseFloat(result.match(/\d+(.(\d){1,2})?/)[0]);

export const TIP_OPTIONS = [
  0.05, 0.08, 0.10, 0.15, 0.18, 0.20
];

export const inputIsValid = result => {
  if (result === undefined || result === null || isNaN(normalizeAmount(result))) {
    return false;
  }
  return true;
}

const calculateDollar = (amount, rate) => (amount * rate).toFixed(2);

export const calculateTips = result => {
  const amountNumber = normalizeAmount(result);
  return TIP_OPTIONS.reduce((acc, range) => ({
    ...acc,
    [range]: {
      amount: calculateDollar(amountNumber, 1),
      tip: calculateDollar(amountNumber, range),
      total: calculateDollar(amountNumber, 1 + range),
    },
  }), {});
};

export const calculateSplit = (total, people) => {
  const totaltNumber = normalizeAmount(total);
  return calculateDollar(totaltNumber / people, 1);
};

export const getDollarSign = result => {
  const t = result
  console.log(t)
  const a = t.replace(/(\d+(.(\d){1,2})?)$/, '');
  console.log(a)
  return a
}
