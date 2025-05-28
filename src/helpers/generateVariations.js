function generateVariations(text, ...ranges) {
  let results = [];

  let variableRanges = Object.fromEntries(
    ranges.map(([symbol, start, end]) => {
      return [
        symbol,
        Array.from({ length: end - start + 1 }, (_, i) =>
          (start + i).toString()
        ),
      ];
    })
  );

  let placeholders = ranges.map((variable) => variable[0]);

  function generateCombination(mapping = {}, count = 0) {
    if (count === placeholders.length) {
      let replacedText = text.replace(
        new RegExp(placeholders.map((symbol) => `\\${symbol}`).join('|'), 'g'),
        (match) => mapping[match]
      );
      results.push(replacedText);
      return;
    }
    for (let num of variableRanges[placeholders[count]]) {
      let newMapping = { ...mapping, [placeholders[count]]: num };
      generateCombination(newMapping, count + 1);
    }
  }

  generateCombination();
  return [...new Set(results)];
}

module.exports = generateVariations;
