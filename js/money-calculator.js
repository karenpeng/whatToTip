const normalizeAmount = amount => parseFloat(amount.replace('$', ''));

export const TIP_OPTIONS = [
  0.10, 0.15, 0.18, 0.20
];

export const inputIsValid = amount => {
  if (amount === undefined || amount === null || isNaN(normalizeAmount(amount))) {
    return false;
  }
  return true;
}

const calculateDollar = (amount, rate) => (amount * rate).toFixed(2);

export const calculateTips = amount => {
  const amountNumber = normalizeAmount(amount);
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
