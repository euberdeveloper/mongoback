import ora from 'ora';
import chalk from 'chalk';
import { LogOptions } from '../../interfaces/options';
import { CollectionsSchema } from '../../interfaces/parsedCollections';

export class Logger {

    private base: boolean;
    private command: boolean;
    private mongoexport: boolean;
    private expectedCollections: boolean;
    private actualCollections: boolean;
    private spinners = {};

    constructor(options: LogOptions) {
        if (!options.silent && options.log) {
            if (typeof options.log === 'string') {
                options.log = [options.log];
            }
            this.base = options.log.includes('base');
            this.command = options.log.includes('command');
            this.mongoexport = options.log.includes('mongoexport');
            this.expectedCollections = options.log.includes('expectedCollections');
            this.actualCollections = options.log.includes('actualCollections');
        }
    }

    public exportingDatabase(db: string): void {
        if (this.base) {
            console.log(chalk.white(db));
        }
    }

    public exportingCollectionStart(db: string, collection: string): void {
        if (this.base) {
            const spinner = ora({
                text: chalk.grey(collection),
                indent: 2,
                spinner: 'dots2'
            }).start();
            this.spinners[`${db}${collection}`] = spinner;
        }
    }

    public exportingCollectionStop(db: string, collection: string, succeded: boolean): void {
        if (this.base) {
            const spinner = this.spinners[`${db}${collection}`];
            if (succeded) {
                spinner.succeed();
            }
            else {
                spinner.fail();
            }
        }
    }

    public printCommand(cmd: string): void {
        if (this.command) {
            const tag = chalk.keyword('darkturquoise')('[COMMAND]');
            const text = chalk.keyword('lightslategray')(cmd); 
            console.log(`${tag} ${text}`);
        }
    }

    public printMongoexport(log: string, success: boolean): void {
        if (this.mongoexport) {
            const tag = success ? chalk.keyword('limegreen')('[SUCCESS]') : chalk.keyword('orange')('[ERROR]');
            const text = chalk.white(log); 
            console.log(`${tag}\n${text}`);
        }
    }

    public printExpectedCollections(expected: CollectionsSchema): void {
        if (this.expectedCollections) {
            const tag = chalk.keyword('yellow')('[COLLECTIONS TO EXPORT]');
            const text = JSON.stringify(expected, null, 2);
            console.log(`${tag}\n${text}`);
        }
    }

    public printExportedCollections(actual: CollectionsSchema): void {
        if (this.actualCollections) {
            const tag = chalk.keyword('yellow')('[COLLECTIONS EXPORTED]');
            const text = JSON.stringify(actual, null, 2);
            console.log(`${tag}\n${text}`);
        }
    }

    public warn(message: string, error: any): void {
        const tag = chalk.keyword('yellow')('[WANING]');
        const text = chalk.keyword('orange')(message);
        console.warn(`${tag} ${text}`, error);
    }

}