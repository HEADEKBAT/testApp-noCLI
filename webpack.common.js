const path = require('path');
var glob = require('glob');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
      const parts = item.split('.');
      const name = parts[0];
      const extension = parts[1];
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
        inject: false,
        minify: false,
      })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html/pages');

var entryPoints = glob.sync('./src/scss/*.scss').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
},{app: './src/index.js'});

module.exports = mode => {
    const PRODUCTION = mode === 'production';

    return {
        entry: entryPoints,
        output: {
            filename: 'js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        'svg-sprite-loader',
                        'svgo-loader',
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        attributes: false,
                        minimize: false
                    },
                    include: path.resolve(__dirname, 'src/html/templates'),
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: PRODUCTION,
            }),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			}),
            new CopyPlugin([
                {from: 'img/**/*'},
                {from: 'fonts/**/*'},
            ],
                {
                    context: 'src',
                    force: true,
                }
            ),
            new SpriteLoaderPlugin(),
        ].concat(htmlPlugins),
    }
};
