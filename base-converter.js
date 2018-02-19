/* Copyright 2018 Ronny Reichmann */
/* BaseConverter */

function BaseConverter (encodingSetString) {
  if (!(this instanceof BaseConverter)) return new BaseConverter(encodingSetString)
  const encodingSet = encodingSetString.split('')
  const base = encodingSet.length
  this.encode = numberValue => {
    const acc = []
    let value = numberValue
    while (value >= base) {
      const newValue = Math.floor(value / base)
      const remainder = value % base
      acc.push(remainder)
      value = newValue
    }
    acc.push(value)
    acc.reverse()
    return acc.map(i => encodingSet[i]).join('')
  }
  this.decode = encodedString => {
    const comps = encodedString.split('').map(c => encodingSet.indexOf(c))
    const lastIndex = comps.length - 1
    const resultString = comps.reduce((acc, comp, index) => {
      return acc + (comp * Math.pow(base, lastIndex - index))
    }, 0)
    return Number(resultString)
  }
}

module.exports = BaseConverter
