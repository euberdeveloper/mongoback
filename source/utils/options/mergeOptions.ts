import { Options } from '../../interfaces/options';
import { DEFAULT_OPTIONS } from './defaultOptions';

export function mergeOptions(options: Options = {}): Options {
    const mergedOptions: Options = {};
    for (const key in DEFAULT_OPTIONS) {
        mergedOptions[key] = (options[key] === undefined ? DEFAULT_OPTIONS[key] : options[key]);
    }
    if (mergedOptions.uri) {
        mergedOptions.srv = undefined;
        mergedOptions.host = undefined;
        mergedOptions.port = undefined;
        mergedOptions.username = undefined;
        mergedOptions.password = undefined;
        mergedOptions.authenticationDatabase = undefined;
        mergedOptions.authenticationMechanism = undefined;
    }
    else {
        if (mergedOptions.username)
            mergedOptions.username = encodeURIComponent(mergedOptions.username);
        if (mergedOptions.password)
            mergedOptions.password = encodeURIComponent(mergedOptions.password);
    }
    return mergedOptions;
}