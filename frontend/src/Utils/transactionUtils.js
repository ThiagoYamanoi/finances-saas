export function parseTransactionDate(value) {

  if (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {

    const [year, month, day] =
      value.split('-').map(Number);

    return new Date(
      year,
      month - 1,
      day
    );
  }

  return new Date(value);
}


export function matchesPeriod(
  transactionDate,
  period
) {

  const now = new Date();


  if (period === 'all') {
    return true;
  }


  if (period === 'currentMonth') {

    return (
      transactionDate.getMonth() ===
        now.getMonth() &&
      transactionDate.getFullYear() ===
        now.getFullYear()
    );
  }


  if (period === 'lastMonth') {

    const lastMonth =
      new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

    return (
      transactionDate.getMonth() ===
        lastMonth.getMonth() &&
      transactionDate.getFullYear() ===
        lastMonth.getFullYear()
    );
  }


  if (period === 'last30Days') {

    const thirtyDaysAgo =
      new Date(now);

    thirtyDaysAgo.setDate(
      now.getDate() - 30
    );

    return (
      transactionDate >= thirtyDaysAgo &&
      transactionDate <= now
    );
  }


  if (period === 'last3Months') {

    const threeMonthsAgo =
      new Date(now);

    threeMonthsAgo.setMonth(
      now.getMonth() - 3
    );

    return (
      transactionDate >= threeMonthsAgo &&
      transactionDate <= now
    );
  }


  if (period === 'currentYear') {

    return (
      transactionDate.getFullYear() ===
      now.getFullYear()
    );
  }


  return true;
}