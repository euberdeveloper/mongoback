import enquirer from 'enquirer';
import { ConnectionOptions } from '../../interfaces/options';

export async function askUri(options: ConnectionOptions, defaultUri: string, askUri: boolean): Promise<string> {
    let uri = defaultUri;
    
    if (askUri || (askUri === undefined && !options.uri)) {
        uri = (await enquirer.prompt({
            type: 'input',
            name: 'uri',
            message: 'Enter the connection uri:',
            initial: defaultUri
        }))['uri'];

        options.uri = uri;
        options.host = undefined;
        options.port = undefined;
        options.username = undefined;
        options.password = undefined;
        options.authenticationDatabase = undefined;
        options.authenticationMechanism = undefined;
        options.srv = undefined;
    }
    
    return uri;
}