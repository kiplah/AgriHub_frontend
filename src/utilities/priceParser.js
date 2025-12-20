/**
 * Parses a price string to extract the numeric value.
 * Handles formats like:
 * - "100" -> 100
 * - "1,000.50" -> 1000.50
 * - "Ksh 1500" -> 1500
 * - "100 per kg" -> 100
 * - "$10.99" -> 10.99
 * 
 * @param {string|number} price - The price input.
 * @returns {number} The parsed float value, or 0 if invalid.
 */
export const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;

    // Convert to string in case it's not
    const priceStr = String(price);

    // 1. Remove commas (often used as thousands separators)
    // 2. Match the first occurrence of a number (integer or float)
    //    Allowed pattern: optional sign, digits, optional decimal point, digits
    const cleanStr = priceStr.replace(/,/g, '');
    const match = cleanStr.match(/-?\d+(\.\d+)?/);

    if (match) {
        return parseFloat(match[0]);
    }

    return 0;
};
