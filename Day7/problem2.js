// --- Part Two ---

// It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

// Consider again your shiny gold bag and the rules from the above example:

//     faded blue bags contain 0 other bags.
//     dotted black bags contain 0 other bags.
//     vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
//     dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.

// So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

// Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

// Here's another example:

// shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.

// In this example, a single shiny gold bag must contain 126 other bags.

// How many individual bags are required inside your single shiny gold bag?

import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day7/input.txt').toString();
const lines = input.split('\n');
const bagTypes = lines.map(line => createBag(line));

const countNumberOfSubBags = bagName => {
  if (!bagName) return 0;

  const bag = bagTypes.find(x => x.name === bagName);
  return bag.totalBags + bag.bags.reduce((acc, bb) => countNumberOfSubBags(bb.name) + acc, 0);
};

function createBag(line) {
  const words = line.split(' ');
  const numOfSubBagTypes = line.split('').filter(x => x === ',').length + 1;
  const skip = 4;
  const bag = { name: words[0] + '_' + words[1], bags: [], containsShinyGold: false };
  for (let i = 1; i <= numOfSubBagTypes; i++) {
    const subBagNum = words[skip * i] == 'no' ? 0 : Number(words[skip * i]);
    for (let j = 1; j <= subBagNum; j++) {
      const subBagName = words[skip * i + 1] + '_' + words[skip * i + 2];
      bag.bags.push({ name: subBagName });
      if (subBagName == 'shiny_gold') {
        bag.containsShinyGold = true;
      }
    }
  }

  bag.totalBags = bag.bags.length;
  return bag;
}

const totalBagsInBagType = countNumberOfSubBags('shiny_gold');
console.log(totalBagsInBagType); // 57281
