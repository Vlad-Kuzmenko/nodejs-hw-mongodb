export const parseNumber = (value, defaultValue) => {
  if (typeof value !== "string") return defaultValue;

  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) return defaultValue;

  return parsedValue;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPege = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPege,
    perPage: parsedPerPage,
  };
};
