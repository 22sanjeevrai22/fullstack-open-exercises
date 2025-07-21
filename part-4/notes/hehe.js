// let animalNoises = [
//   {
//     dog: {
//       America: "Woof! Woof!",
//       Germany: "Wau Wau!",
//       England: "Bow wow!",
//       Uruguay: "Jua jua!",
//       Afrikaans: "Blaf!",
//       Korea: "Mong mong!",
//       Iceland: "Voff voff!",
//       Albania: "Ham!",
//       Algeria: "Ouaf ouaf!",
//     },
//   },
//   {
//     cat: {
//       America: "Meow",
//       Germany: "Miauw!",
//       England: "mew mew",
//       Uruguay: "Miau Miau!",
//       Afrikaans: "Purr",
//       Korea: "Nyaong!",
//       Iceland: "Kurnau!",
//       Albania: "Miau",
//       Algeria: "Miaou!",
//     },
//   },
//   {
//     chicken: {
//       America: "Cluck cluck",
//       Germany: "tock tock tock",
//       England: "Cluck Cluck",
//       Uruguay: "gut gut gdak",
//       Afrikaans: "kukeleku",
//       Korea: "ko-ko-ko",
//       Iceland: "Chuck-chuck!",
//       Albania: "Kotkot",
//       Algeria: "Cotcotcodet",
//     },
//   },
// ];

// // YOUR CODE BELOW
// const petSounds = (searchAnimal, country) => {
//   let pluralAnimal =
//     searchAnimal[0].toUpperCase() + searchAnimal.slice(1) + "s";
//   for (let i = 0; i < animalNoises.length; i++) {
//     let findAnimal = animalNoises[i];

//     return `${pluralAnimal} in ${country} say ${findAnimal[searchAnimal][country]}`;
//   }
// };

// console.log(petSounds("dog", "Iceland"));

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

var wordPattern = function (pattern, s) {
  let sentenceArray = s.split(" ");
  if (pattern.length !== sentenceArray.length) return false;

  const patternToSentence = {};
  const sentenceToPattern = {};

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = sentenceArray[i];

    if (
      (patternToSentence[char] && patternToSentence[char] !== word) ||
      (sentenceToPattern[word] && sentenceToPattern[word] !== char)
    ) {
      return false;
    }

    patternToSentence[char] = word;
    sentenceToPattern[word] = char;
  }

  return true;
};

var wordPattern = function (pattern, s) {
  let newS = s.split(" ");
  if (pattern.length !== newS.length) return false;

  const patternToS = {};
  const sToPattern = {};

  for (let i = 0; i < pattern.length; i++) {
    if (!patternToS[pattern[i]]) {
      patternToS[pattern[i]] = newS[i];
    }
    if (!sToPattern[newS[i]]) {
      sToPattern[newS[i]] = pattern[i];
    }

    if (
      patternToS[pattern[i]] !== newS[i] ||
      sToPattern[newS[i]] !== pattern[i]
    ) {
      return false;
    }
  }

  return true;
};

console.log(wordPattern("abba", "dog cat cat dog")); // ✅ true  how do this version checks false
