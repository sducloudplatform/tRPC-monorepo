# 接口文档

## 1.用户

### 1.0 携带token

- 除登录、注册外所有请求携带token
- 请求参数

```
在 Header 添加参数 Authorization，其值为在 Bearer 之后拼接 Token
示例：
Authorization:Bearer xxxx-xxxx-xxxx-xxxx
```

- 响应

| statuscode | message       | error | 说明                                          |
| ---------- | ------------- | ----- | --------------------------------------------- |
| 401        | 请登录        |       | 没带token，跳转登录页面                       |
| 401        | 重新登录      |       | token过期，跳转登陆页面                       |
| 401        | 用户身份过期  |       | 已用该账号再次登录，原token失效，跳转登陆页面 |
| 401        | 请求刷新token |       | 短token到期，携带此token执行刷新token         |
|            |               |       |                                               |
|            |               |       |                                               |



### 1.1登录

- URL

```
POST http://localhost:3000/user/signIn
```

- 请求参数

| 参数     | 必选 | 类型   | 说明 |
| -------- | ---- | ------ | ---- |
| username |      | string |      |
| password |      | string |      |

- 返回字段

| 返回字段 | 类型   | 说明 |
| -------- | ------ | ---- |
| token    | string |      |

### 1.2注册

- URL

```
POST http://localhost:3000/user/signUp
```

- 请求参数

| 参数     | 必选 | 类型   | 说明 |
| -------- | ---- | ------ | ---- |
| username |      | string |      |
| password |      | string |      |

- 返回字段

| 返回字段             | 类型   | 说明     |
| -------------------- | ------ | -------- |
| uid                  | number |          |
| username             | string |          |
| password             | string |          |
| relation_characterid | number | 用户角色 |

### 1.3刷新token

- URL

```
GET http://localhost:3000/user/refreshToken
```

- 请求参数

```
在 Header 添加参数 Authorization，其值为在 Bearer 之后拼接 Token
示例：
Authorization:Bearer xxxx-xxxx-xxxx-xxxx

```

