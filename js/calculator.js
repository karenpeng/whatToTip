export const normalizeAmount = amount => amount && parseFloat(amount.replace('$', ''));

const calculateDollar = (amount, rate) => (amount * rate).toFixed(2);

export const calculateTips = amount => {
  const amountNumber = normalizeAmount(amount);
  if (isNaN(amountNumber)) {
    return console.log(new Error('not a number, try again!'))
  }
  return {
    '15%': {
      amount: amountNumber,
      tip: calculateDollar(amountNumber, 0.15),
      total: calculateDollar(amountNumber, 1.15),
    },
    '18%': {
      amount: amountNumber,
      tip: calculateDollar(amountNumber, 0.18),
      total: calculateDollar(amountNumber, 1.18),
    },
    '20%': {
      amount: amountNumber,
      tip: calculateDollar(amountNumber, 0.2),
      total: calculateDollar(amountNumber, 1.2),
    },
  };
};

export const calculateSplit = (total, people) => {
  const totaltNumber = normalizeAmount(total);
  if (isNaN(totaltNumber)) {
    return console.log(new Error('not a number, try again!'))
  }
  return calculateDollar(totaltNumber / people, 1);
};
