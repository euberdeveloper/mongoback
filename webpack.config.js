const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const utilsConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/utils.helper.ts',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './source/tsconfig.json',
            extensions: ['.ts', '.js']
        })]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: path.resolve(__dirname, 'source'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: { compiler: 'ttypescript' }
                    }
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'utils'),
        filename: 'utils.js',
        library: 'mongoback',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const libConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './source/tsconfig.json',
            extensions: ['.ts', '.js']
        })]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: path.resolve(__dirname, 'source'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: { compiler: 'ttypescript' }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'mongoback',
            main: 'dist/index.d.ts',
            out: '../bundled/lib/index.d.ts'
        })
    ],
    externals: [{
        '@/utils/checkMongoexportInstalled': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/logger': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/options': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/getParsedCollections': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/exportCollections': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/connection': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib'),
        filename: 'index.js',
        library: 'mongoback',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const binConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: './source/index.bin.ts',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './source/tsconfig.json',
            extensions: ['.ts', '.js']
        })]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: path.resolve(__dirname, 'source'),
                use: [
                    {
                        loader: 'ts-loader',
                        options: { compiler: 'ttypescript' }
                    },
                    {
                        loader: 'shebang-loader'
                    }
                ]
            }
        ]
    },
    externals: [{
        '@/utils/checkMongoexportInstalled': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/logger': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/options': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/getParsedCollections': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/exportCollections': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/connection': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        },
        '@/utils/getParsedCollections/purgeExportingOptions': {
            amd: '../utils/utils',
            root: 'mongoback',
            commonjs: '../utils/utils',
            commonjs2: '../utils/utils'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin'),
        filename: 'index.js',
        library: 'mongoback',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

module.exports = [
    utilsConfig,
    libConfig,
    binConfig
];