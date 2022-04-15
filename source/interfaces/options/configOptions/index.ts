/**
 * Various config options
 */
export interface ConfigOptions {
    /**
     * The backup method to use.
     *
     * Possible values:
     * - 'mongoexport': During exporting, mongoexport command will be used
     * - 'mongodump': During exporting, mongodump command will be used
     *
     * Default: 'mongoexport'
     */
    method?: 'mongoexport' | 'mongodump';
}
