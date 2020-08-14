import { calculateCost } from '../libs/billing-lib';

it('expects lowest tier', () => {
    const storage = 10;
    const cost = 4000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost)
})

it('expects middle tier', () => {
    const storage = 50;
    const cost = 10000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost)
})

it('expects upper tier', () => {
    const storage = 120;
    const cost = 12000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost)
})