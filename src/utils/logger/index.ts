import ora from 'ora';
import chalk from 'chalk';
import { LogOptions } from "../../interfaces/options";

export class Logger {

    private base: boolean;
    private command: boolean;
    private mongoexport: boolean;
    private expectedCollections: boolean;
    private actualCollections: boolean;
    private spinners = {};

    constructor(options: LogOptions) {
        if (!options.silent) {
            this.base = options.log.includes('base');
            this.command = options.log.includes('command');
            this.mongoexport = options.log.includes('mongoexport');
            this.expectedCollections = options.log.includes('expectedCollections');
            this.actualCollections = options.log.includes('actualCollections');
        }
    }

    public exportingDatabase(db: string): void {
        if (this.base && !this.mongoexport) {
            console.log(chalk.white(db));
        }
    }

    public exportingCollectionStart(db: string, collection: string): void {
        if (this.base && !this.mongoexport) {
            const spinner = ora({
                text: chalk.grey(collection),
                indent: 2,
                spinner: "dots2"
            }).start();
            this.spinners[`${db}${collection}`] = spinner;
        }
    }

    public exportingCollectionStop(db: string, collection: string, succeded: boolean): void {
        if (this.base && !this.mongoexport) {
            const spinner = this.spinners[`${db}${collection}`];
            if (succeded) {
                spinner.succeed();
            }
            else {
                spinner.fail();
            }
        }
    }

    public printCommand(text: string): void {
        if (this.command) {
            console.log(text);
        }
    }

    public printMongoexport(text: string): void {
        if (this.mongoexport) {
            console.log(text);
        }
    }

}