# 自动化运维 Web 服务接口

## 开始

- 安装依赖

  ```shell
  npm i
  ```

- 本地开发

  ```shell
  npm run dev
  ```

- 启动

  ```shell
  npm run start
  ```

- 单元测试

  ```shell
  npm run test
  ```

- 代码格式检测

  ```shell
  npm run lint
  ```

- 代码格式修改

  ```shell
  npm run prettier
  ```

## 需要注意

​ 由于配置了 [husky](https://www.npmjs.com/package/husky) 所以需要 `Git` 的版本高于 `2.13`

## 文件结构

```shell
.
├── README.md
├── app
│   ├── controllers                 # controller文件夹
│   │   └── common.js
│   ├── lib                         # redis/mysql等依赖的添加
│   │   ├── mysql.js
│   │   ├── redis.js
│   │   └── redis_key.js            # redis key 用于构造格式统一的redis key
│   ├── listeners                   # 输出错误目的地文件夹,可以添加其他的输出源比如企业微信等
│   │   └── logError.js             # 输出到控制台
│   ├── middlewares                 # 中间件文件夹
│   │   ├── accessLog.js
│   │   ├── attach_ctx_logger.js
│   │   ├── attach_ctx_mysql.js
│   │   ├── attach_ctx_redis.js
│   │   ├── handle401Error.js
│   │   ├── handle404Error.js
│   │   ├── handle4xxError.js
│   │   └── handle500Error.js
│   ├── models                      # 数据库Model文件夹
│   │   ├── Iteration.js
│   │   ├── Oms.js
│   │   ├── Projects.js
│   │   ├── Release.js
│   │   ├── Story.js
│   │   ├── Task.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routers                     # 路由文件夹
│   │   ├── common.js
│   │   └── index.js
│   ├── services                    # service文件夹
│   │   └── index.js
│   └── utils                       # 工具类文件夹
│       ├── __tests__               # 测试用例文件夹
│       │   └── index.spec.js       # 测试用例
│       ├── index.js                # 工具函数文件
│       └── logger.js               # logger文件
├── app.js                          # 入口文件
├── config                          # 配置
│   ├── default.js
│   ├── development.js
│   └── production.js
├── jest.config.js                  # 单元测试配置
├── nodemon.json                    # 热更新配置
├── package-lock.json
└── package.json                    # 项目依赖
```

## 参考

[jest](https://jestjs.io/en/)

[ioredis](https://www.npmjs.com/package/ioredis)

[redis](http://www.redis.cn/)

[sequelize](https://sequelize.org/)

[Koa](https://koajs.com/)
