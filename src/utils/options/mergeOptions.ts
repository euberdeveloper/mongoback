import { Options } from '../../interfaces/options';
import { DEFAULT_OPTIONS } from './defaultOptions';

export function mergeOptions(options: Options): Options {
    const mergedOptions: Options = {};
    for (const key in DEFAULT_OPTIONS) {
        mergedOptions[key] = (options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key]);
    }
    return mergedOptions;
}