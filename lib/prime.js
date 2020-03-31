module.exports = isPrime;

function isPrime(num) {
  is = true;
  for (let n = 2; n < num - 1; n++) {
    if (num % n === 0) is = false;
  }
  return is;
}
