import * as enquirer from 'enquirer';
import { OutOptions } from '@/types/options';

export async function askDestination(options: OutOptions, askDestination: boolean): Promise<void> {
    if (askDestination) {
        const enquirerResult: any = await enquirer.prompt({
            type: 'input',
            name: 'outDir',
            message: 'Enter the export path:',
            initial: options.outDir
        });
        options.outDir = enquirerResult.outDir;
    }
}
