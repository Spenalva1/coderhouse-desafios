process.on('message', length => {
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
  process.send(numbers);
});