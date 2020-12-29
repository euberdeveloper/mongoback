module.exports = {
    mode: 'modules',
    name: 'mongoback - DEV',
    includeVersion: true,
    tsconfig: 'source/tsconfig.json',
    gaID: process.env.GA_TOKEN,
    out: './docs/documentation/html-dev'
};