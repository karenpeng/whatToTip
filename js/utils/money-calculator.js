const normalizeAmount = result => {
  const withoutComma = result.replace(',', '');
  return parseFloat(withoutComma.match(/\d+(\.(\d){1,2})?/)[0]);
};

export const TIPS_OPTIONS = [
  0.05, 0.08, 0.10, 0.15, 0.18, 0.20, 0.25
];

export const inputIsValid = result => {
  if (!result || isNaN(normalizeAmount(result))) {
    return false;
  }
  return true;
}

const calculateDollar = (amount, rate) => (amount * rate).toFixed(2);

export const calculateTips = result => {
  const amountNumber = normalizeAmount(result);
  return TIPS_OPTIONS.reduce((acc, range) => ({
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
  const match = result.match(/(\D)(\d)+\.(\d){1,2}/);
  return match ? match[1] : '';
};
