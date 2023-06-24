export default {
  check,
  lookup,
};

var elements;

await loadPeriodicTable();

// ****************************

async function loadPeriodicTable() {
  elements = await (await fetch("periodic-table.json")).json();
}

const mapElements = elements.reduce((acc, elem) => {
  const e = elem.symbol.toLowerCase();
  acc[e] = elem;
  return acc;
}, {});

const match = (elem) => mapElements[elem];

function check(inputWord) {
  // TODO: determine if `inputWord` can be spelled
  // with periodic table symbols; return array with
  // them if so (empty array otherwise)

  const head = (word) => word[0];
  const tail = (word) => word?.slice(1, word.length);
  let output = [];
  const leaf = (inputWord, acc) => {
    const l1 = leaf;
    const l2 = leaf;

    const inputWord1 = tail(inputWord);
    const inputWord2 = tail(tail(inputWord));

    const elem1 = head(inputWord);
    const elem2 = head(inputWord) + head(tail(inputWord));

    if (!inputWord) {
      if (!acc.length) {
        output = [];
        return [];
      }

      output = acc;
      return acc;
    }

    if (match(elem1)) {
      l1(inputWord1, [...acc, elem1]);
    }
    if (match(elem2)) {
      l2(inputWord2, [...acc, elem2]);
    }

    return output;
  };
  return leaf(inputWord, []);
}

function lookup(elementSymbol) {
  // TODO: return the element entry based on specified
  // symbol (case-insensitive)
  return match(elementSymbol);
}
