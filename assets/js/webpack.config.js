const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const config = (env, options) => {
    return {
        entry: "./src/index.js",
        mode: "production",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                svgo: {
                                    plugins: [{ removeTitle: false }],
                                    floatPrecision: 2,
                                },
                                jsx: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                    exclude: /\.module\.css$/,
                },
            ],
        },
        output: {
            path: __dirname + "/build",
            publicPath: "/",
            filename: "index.js",
        },
        devtool: "source-map",
        watch: true,
        plugins: [
            new MiniCssExtractPlugin(),
            new BrowserSyncPlugin({
                host: "localhost",
                port: 4040,
                injectChanges: true,
                watch: true,
                reloadOnRestart: true,
                reloadDelay: 300,
                files: ["./**/*.php"],
                watchEvents: ["change", "add", "unlink", "addDir", "unlinkDir"],
                proxy: "http://hoodsly.test/",
            }),
        ],
    };
};

module.exports = config;
