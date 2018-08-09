import { crop } from '../src';

const MOCK_URL = 'https://api.meleven.de/out/channel/o_crop,w_40,h_40/712aav8a9100a.jpg';
const RESULT_URL = 'https://api.meleven.de/out/channel/o_crop,w_100,h_100/712aav8a9100a.jpg';
const CLEAN_URL = 'https://api.meleven.de/out/channel/712aav8a9100a.jpg';

describe('crop method', () => {
    test('is a function', () => {
        expect(typeof crop).toBe('function');
    });

    test('returns a string', () => {
        const result = crop(MOCK_URL, 100, 100);
        expect(typeof result).toBe('string');
    });

    test('throws TypeError when no url is provided', () => {
        try {
            crop();
        } catch (e) {
            expect(e instanceof TypeError).toBeTruthy();
        }
    });

    test('throws TypeError when no dimensions are provided', () => {
        try {
            crop(MOCK_URL);
        } catch (e) {
            expect(e instanceof TypeError).toBeTruthy();
        }
    });

    test('modifies existing parameters', () => {
        expect(crop(MOCK_URL, 100, 100)).toBe(RESULT_URL);
    });

    test('modifies url without existing parameters', () => {
        expect(crop(CLEAN_URL, 100, 100)).toBe(RESULT_URL);
    });
});
