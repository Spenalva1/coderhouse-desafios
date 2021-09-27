process.on('message', length => {
  process.send(getRandomNumbers(length));
});

function getRandomNumbers(length = 0) {
  const numbers = {};
  let number;
  for (let i = 0; i < length; i++) {
    number = Math.ceil(Math.random() * 1000);
    if (numbers[number]) {
      numbers[number]++;
    } else {
      numbers[number] = 1;
    }
  }
  return numbers;
}

module.exports = getRandomNumbers