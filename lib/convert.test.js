const convert = require('./convert')

test('convert 4 to 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('convert 0 to 0', () => {
    expect(convert.convert(0, 0)).toBe(0)
})

test('convert "10" to "10" ', () => {
    expect(convert.convert('10', '10')).toBe(100)
})

test('toMoney 10 ', () => {
    expect(convert.toMoney(10)).toBe('10.00')
})

test('toMoney "a" ', () => {
    expect(convert.toMoney("a")).toBe('NaN')
})