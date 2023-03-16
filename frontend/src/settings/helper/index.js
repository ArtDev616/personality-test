export function getBestDuplicateNumber(numbers) {
  const counts = {};
  let bestNumber,
    bestCount = 0;

  // Step 1: Count the number of occurrences of each number
  for (const number of numbers) {
    counts[number] = (counts[number] || 0) + 1;
  }

  // Step 2: Find the number with the highest count
  for (const number of numbers) {
    if (counts.hasOwnProperty(number) && counts[number] > bestCount) {
      bestNumber = number;
      bestCount = counts[number];
    }
  }

  // Step 3: Return the number with the highest count
  return bestNumber;
}
