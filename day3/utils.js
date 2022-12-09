const getCharValue = (value) => {
  // perhaps we can use ascii here: 
  // a - z = 97 - 122
  // A - Z = 65 - 90
  // while for the give" 
  // a - z = 1 - 26
  // A - Z = 27 - 52

  // if lowercase, 1 - 26
  // so a, from 97 will become 1 (97 - 96)

  // if uppercase, 27 - 52
  // for A, from 65 will become 27 (65 - 38)

  let charCodeAt = value.toString().charCodeAt(0);
  if (charCodeAt >= 97) {
    return charCodeAt - 96;
  } else {
    return charCodeAt - 38
  }
}

module.exports = {
  getCharValue
}