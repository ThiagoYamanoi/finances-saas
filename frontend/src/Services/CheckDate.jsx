function isValidDate(dateString) {
  if (!dateString) {
    return false;
  }

  const [year, month, day] = dateString
    .split('-')
    .map(Number);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  // não permite transação no futuro
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date > today) {
    return false;
  }

  return true;
}

export default isValidDate;