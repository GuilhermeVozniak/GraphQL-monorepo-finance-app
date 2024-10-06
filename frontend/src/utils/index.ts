import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

/**
 * A utility function to merge Tailwind CSS classes with other classes.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * A utility function to capitalize the first letter of a string.
 */
export const capitalize = (str: string, keepTheOriginalCasing?: boolean) => {
  return `${str.charAt(0).toUpperCase()}${
    keepTheOriginalCasing ? str.slice(1) : str.slice(1).toLowerCase()
  }`;
};

/**
 * @param timeStamp - string
 * @param format - dayjs format string
 * @returns
 */
export const formatDate = (
  timeStamp: string,
  format: string = "MMMM D, YYYY",
  shouldParseInt: boolean = true
) => {
  const date = dayjs(shouldParseInt ? parseInt(timeStamp) : timeStamp);
  return date.format(format);
};
