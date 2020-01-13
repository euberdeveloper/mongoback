import enquirer from 'enquirer';
import { OutOptions } from '../../interfaces/options';

export async function askDestination(options: OutOptions, askDestination: boolean): Promise<void> {    
    if (askDestination) {
        options.outDir = (await enquirer.prompt({
            type: 'input',
            name: 'outDir',
            message: 'Enter the export path:',
            initial: options.outDir
        }))['outDir'];
    }
    
}