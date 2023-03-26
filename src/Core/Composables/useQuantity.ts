export const useQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit === "u" ? "" : unit}`;
};
