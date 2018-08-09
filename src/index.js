// @flow
import * as errors from './errors';
import type { MelevenParameter } from './types';

const MELEVEN_REGEX = /(.*?\.meleven\.de\/out)\/(.*?)\/(?:(.*?)\/)?(.*)/g;

/**
 * Creates a parameter string from an array of meleven parameters.
 *
 * @param parameters {Array<MelevenParameter>} Meleven parameters
 * @returns {string|null} Parameter string or null
 */
const createParameterString = (
    parameters?: Array<MelevenParameter>
): ?string => {
    if (!parameters || parameters.length === 0) {
        return null;
    }

    const result = parameters.reduce((result, parameter) => {
        const parameterStringBuilder = [parameter.command];

        if (parameter.options && parameter.options.length) {
            parameterStringBuilder.push(...parameter.options);
        }

        return result.concat(parameterStringBuilder.join(','));
    }, []);

    return result.join('::');
};

/**
 * Replaces the parameters in a URL with the specified parameters.
 *
 * @param url URL to replace parameters in
 * @param parameters {Array<MelevenParameter>} Meleven parameters
 * @returns {string} Result URL containing the specified parameters
 */
const replaceParameters = (
    url: string,
    parameters?: Array<MelevenParameter>
): string => {
    const parameterString = createParameterString(parameters);

    return url.replace(MELEVEN_REGEX, (match, baseUrl, channel, param, id) => {
        const result = [baseUrl, channel];

        if (parameterString !== null) {
            result.push(parameterString);
        }

        return [...result, id].join('/');
    });
};

/**
 * Takes a meleven image URL and modifies/adds resize parameters
 * to match the specified dimensions.
 *
 * @param url meleven image URL
 * @param width Desired width
 * @param height Desired height
 */
export const resize = (url: string, width: number, height: number): string => {
    if (!url) {
        throw new TypeError(errors.NO_URL);
    }

    if (!width || !height) {
        throw new TypeError(errors.NO_DIMENSIONS);
    }

    return replaceParameters(url, [
        {
            command: 'o_resize',
            options: [`w_${width}`, `h_${height}`]
        }
    ]);
};

export const crop = (url: string, width: number, height: number): string => {
    if (!url) {
        throw new TypeError(errors.NO_URL);
    }

    if (!width || !height) {
        throw new TypeError(errors.NO_DIMENSIONS);
    }

    return replaceParameters(url, [
        {
            command: 'o_crop',
            options: [`w_${width}`, `h_${height}`]
        }
    ]);
};
