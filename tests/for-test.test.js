const reverse = require('../utils/for-test').reverse
const average = require('../utils/for-test').average

test('reverse of a', () => {
    const result = reverse('a')
    expect(result).toBe('a')
})

test('reverse of react', () => {
    expect(reverse('react')).toBe('tcaer')
})

test('average of [1,2,3]', () => {
    const avg = average([1, 2, 3])
    expect(avg).toBe(2)
})