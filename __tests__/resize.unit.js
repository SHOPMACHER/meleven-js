import { resize } from '../src';

const MOCK_URL = 'https://api.meleven.de/out/channel/o_resize,w_390,h_370/712aav8a9100a.jpg';
const RESULT_URL = 'https://api.meleven.de/out/channel/o_resize,w_100,h_100/712aav8a9100a.jpg';
const RESULT_LIMIT_URL = 'https://api.meleven.de/out/channel/o_resize,w_100,h_100,m_limit/712aav8a9100a.jpg';
const CLEAN_URL = 'https://api.meleven.de/out/channel/712aav8a9100a.jpg';

describe('resize method', () => {
    test('is a function', () => {
        expect(typeof resize).toBe('function');
    });

    test('returns a string', () => {
        const result = resize(MOCK_URL, 100, 100);
        expect(typeof result).toBe('string');
    });

    test('throws TypeError when no url is provided', () => {
        try {
            resize();
        } catch (e) {
            expect(e instanceof TypeError).toBeTruthy();
        }
    });

    test('throws TypeError when no dimensions are provided', () => {
        try {
            resize(MOCK_URL);
        } catch (e) {
            expect(e instanceof TypeError).toBeTruthy();
        }
    });

    test('modifies existing parameters', () => {
        expect(resize(MOCK_URL, 100, 100)).toBe(RESULT_URL);
    });

    test('modifies url without existing parameters', () => {
        expect(resize(CLEAN_URL, 100, 100)).toBe(RESULT_URL);
    });

    test('adds limit parameter', () => {
        expect(resize(CLEAN_URL, 100, 100, true)).toBe(RESULT_LIMIT_URL);
    });
});
