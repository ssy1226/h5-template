/* 环境变量 */
type EnvConfig = {
  ENV_TYPE: 'test' | 'staging' | 'production'
  BASE_URL: string,
  APPID: string
  AGENTID: string
  WXORIGIN: string
}
/* 用户数据 */
type AppUserInfo = {
  userId: string
  nickName: string
  sex: 0 | 1 | 2
}