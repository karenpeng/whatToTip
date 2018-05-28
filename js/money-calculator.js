const normalizeAmount = amount => parseFloat(amount.replace('$', ''));

export const inputIsValid = amount => {
  if (amount === undefined || amount === null || isNaN(normalizeAmount(amount))) {
    return false;
  }
  return true;
}

const calculateDollar = (amount, rate) => (amount * rate).toFixed(2);

export const calculateTips = amount => {
  const amountNumber = normalizeAmount(amount);
  return {
    '15%': {
      amount: calculateDollar(amountNumber, 1),
      tip: calculateDollar(amountNumber, 0.15),
      total: calculateDollar(amountNumber, 1.15),
    },
    '18%': {
      amount: calculateDollar(amountNumber, 1),
      tip: calculateDollar(amountNumber, 0.18),
      total: calculateDollar(amountNumber, 1.18),
    },
    '20%': {
      amount: calculateDollar(amountNumber, 1),
      tip: calculateDollar(amountNumber, 0.2),
      total: calculateDollar(amountNumber, 1.2),
    },
  };
};

export const calculateSplit = (total, people) => {
  const totaltNumber = normalizeAmount(total);
  return calculateDollar(totaltNumber / people, 1);
};
