const reverse = (string) => {
    return string.split('').reverse().join('')
}

const average = (numbers) => numbers.reduce((sum, item) => sum + item) / numbers.length

module.exports = {
    reverse, average
}