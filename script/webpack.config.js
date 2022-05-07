const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  // 开发模式：生产环境，打包输出
  mode: isDev ? 'development' : 'production',
  // 入口文件
  entry: path.resolve(process.cwd(), 'src'),
  // 输出配置
  output: {
    // 输出路径
    path: path.resolve(process.cwd(), 'dist'),
    // 输出js文件规则  
    filename: isDev ? '[name].js' : 'static/js/[name].[hash:5].js',
    // 公共路径
    publicPath: isDev ? '/' : './',
    // 静态文件路径处理
    assetModuleFilename: 'static/files/[name].[hash:4][ext]',
    // 编码环境
    environment: {
      // 打包后是否允许箭头函数
      arrowFunction: false
    },
  },
  // 开发环境服务配置
  devServer: {
    static: {
      directory: './',
    },
    port: 8080
  },
  // 全局规则处理
  resolve: {
    alias: {
      // 使用@符号代表src路径
      '@': path.resolve(process.cwd(), 'src'),
    }
  },
  // 是否打开源码映射，便于浏览器调试
  devtool: 'source-map',
  // 依赖模块
  module: {
    noParse: /jquery|lodash/,
    rules: [
      // es6语法转换
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            sourceMap: true,
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      // scss、css语法转换
      {
        test: /\.(css|scss)?$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          },
          // css兼容语法插件，打包后会兼容多个浏览器
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      overrideBrowserslist: [
                        "defaults",
                        "not ie < 11",
                        "last 2 versions",
                        "> 1%",
                        "iOS 7",
                        "last 3 iOS versions"
                      ]
                    },
                  ],
                ],
              },
            }
          }
        ],
      },
      // webpack5使用Asset Modules和Rule.generator.filename进行静态资源打包
      // Rule.generator.filename的优先级高于Asset Modules
      // 放弃url-loader的使用
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize:8 * 1024, // 8kb
          }
        },
        generator: {
          filename: () => isDev ? 'static/images/[name][ext]' : 'static/images/[name].[hash:4][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|map3|wav|flac|aac)$/i,
        type: 'asset/resource',
        generator: {
          filename: () => isDev ? 'static/medias/[name][ext]' : 'static/medias/[name].[hash:4][ext]'
        }
      },
      // 解析html文件中标签引入资源，
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "source",
                attribute: "src",
                type: "src",
              },
            ],
            urlFilter: (attribute, value, resourcePath) => {
              // The `attribute` argument contains a name of the HTML attribute.
              // The `value` argument contains a value of the HTML attribute.
              // The `resourcePath` argument contains a path to the loaded HTML file.
              if (/example\.pdf$/.test(value)) {
                return false;
              }
              return true;
            },
          },
        },
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // 清理上次打包文件内容
    !isDev && new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ].filter(Boolean)
};