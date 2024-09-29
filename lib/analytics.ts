import { db, Member, Offertory } from "@/models/db";
import { generateUUID } from "./functions";

/**
 * Calculates the total tithes and the percentage increase or decrease compared to the previous period.
 *
 * @param {number[]} currentTithes - An array of tithes for the current period.
 * @param {number[]} previousTithes - An array of tithes for the previous period.
 * @returns {{ total: number, percentageChange: number }} An object containing the total tithes and the percentage change.
 *
 * @throws {Error} If either `currentTithes` or `previousTithes` is not an array.
 * @throws {Error} If arrays contain non-numeric values.
 *
 * @example
 * const current = [100, 200, 300];
 * const previous = [90, 180, 270];
 * const result = getTotalTithes(current, previous);
 * console.log(result); // { total: 600, percentageChange: 11.11 }
 */
export function getTotalTithes(
  currentTithes: number[],
  previousTithes: number[]
) {
  if (!Array.isArray(currentTithes) || !Array.isArray(previousTithes)) {
    throw new Error("Both currentTithes and previousTithes must be arrays.");
  }

  const isValidArray = (arr: number[]) =>
    arr.every((value) => typeof value === "number" && !isNaN(value));

  if (!isValidArray(currentTithes) || !isValidArray(previousTithes)) {
    throw new Error("Arrays must contain only numeric values.");
  }

  const totalCurrent = currentTithes.reduce((sum, tithe) => sum + tithe, 0);
  const totalPrevious = previousTithes.reduce((sum, tithe) => sum + tithe, 0);

  let percentageChange = 0;
  if (totalPrevious > 0) {
    percentageChange = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
  }

  return {
    total: totalCurrent,
    percentageChange: parseFloat(percentageChange.toFixed(2)), // round to 2 decimal places
  };
}

/**
 * Retrieves new tithers from IndexedDB who started tithing within the given date range.
 *
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Promise<Array>} A promise that resolves to an array of new tithers.
 *
 * @example
 * getNewTithers(new Date('2024-01-01'), new Date('2024-12-31'))
 *   .then(newTithers => console.log(newTithers));
 */
export async function getTithersWithRange(startDate: string, endDate: string) {
  try {
    console.log(startDate);
    const newTithers = await db.tithe
      .where("date")
      .between(startDate, endDate, true, true)
      .toArray();
    console.log(newTithers, "newTithers");
    return newTithers;
  } catch (error) {
    console.error("Error retrieving new tithers:", error);
    throw error;
  }
}

/**
 * Retrieves offerings from IndexedDB, optionally filtered by member ID or date range.
 *
 * @param {string} [memberId] - Optional member ID to filter offerings.
 * @param {string} [startDate] - Optional start date for the date range filter in "YYYY-MM-DD" format.
 * @param {string} [endDate] - Optional end date for the date range filter in "YYYY-MM-DD" format.
 * @returns {Promise<Array<Offertory>>} A promise that resolves to an array of offerings.
 *
 * @example
 * // Get all offerings
 * getOfferings()
 *   .then(offerings => console.log('All Offerings:', offerings))
 *   .catch(console.error);
 *
 * @example
 * // Get offerings for a specific member
 * getOfferings('1')
 *   .then(offerings => console.log('Member Offerings:', offerings))
 *   .catch(console.error);
 *
 * @example
 * // Get offerings within a date range
 * getOfferings(undefined, '2024-01-01', '2024-12-31')
 *   .then(offerings => console.log('Offerings within date range:', offerings))
 *   .catch(console.error);
 */
export async function getOfferings(
  memberId?: string,
  startDate?: string,
  endDate?: string
): Promise<Offertory[]> {
  try {
    let offerings: Offertory[];

    // 1. Filter by member ID
    if (memberId) {
      offerings = await db.offertory
        .where("memberId")
        .equals(memberId)
        .toArray();
    } else {
      // 2. Get all offerings
      offerings = await db.offertory.toArray();
    }

    // 3. Optionally filter by date range
    if (startDate || endDate) {
      const start = startDate || "0000-01-01"; // Default to a very early date
      const end = endDate || "9999-12-31"; // Default to a very late date

      offerings = offerings.filter((offering) => {
        const offeringDate = offering.date; // Date is already in "YYYY-MM-DD" format
        return offeringDate! >= start && offeringDate! <= end;
      });
    }

    return offerings;
  } catch (error) {
    console.error("Error retrieving offerings:", error);
    throw error;
  }
}

/**
 * Retrieves active tithers from IndexedDB, defined as members who have made tithes within a specified time frame.
 *
 * @param {string} [timeframe] - Optional timeframe to filter active tithers ('monthly', 'yearly', etc.).
 * @returns {Promise<Array>} A promise that resolves to an array of active tithers.
 *
 * @example
 * // Get all active tithers in the last month
 * getActiveTithers('monthly')
 *   .then(activeTithers => console.log('Active Tithers:', activeTithers))
 *   .catch(console.error);
 */
export async function getActiveTithers(timeframe: string) {
  try {
    const activeTithers = new Set(); // Use a Set to avoid duplicate member IDs

    // Get the current date
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    // Define the date range based on the timeframe
    let startDate;
    switch (timeframe) {
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() - 1);
        startDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        break;
      case "yearly":
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        startDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        break;
      default:
        // If no timeframe is specified, we can default to the last year
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        startDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        break;
    }

    // Get all tithes from the tithes table
    const allTithes = await db.tithe.toArray();

    // Filter tithes based on the start date and collect active tithers
    allTithes.forEach((tithe) => {
      const titheDate = tithe.date; // Date is already in "YYYY-MM-DD" format
      if (titheDate! >= startDate) {
        activeTithers.add(tithe.memberId); // Add the member ID to the Set
      }
    });

    // Get the member details for the active tithers
    const activeTitherIds = Array.from(activeTithers) as unknown[] as string[];
    const activeTitherDetails = await db.chmembers
      .where("id")
      .anyOf(activeTitherIds)
      .toArray();

    return activeTitherDetails; // Return the array of active tithers
  } catch (error) {
    console.error("Error retrieving active tithers:", error);
    throw error;
  }
}
