import { PREFIX } from './common';

/** 用户 */
// const USER = {
//   LOGIN: `${PREFIX.USER}gateway/login`, //登录
//   MODIFY_PWD: `${PREFIX.USER}system/user/modify-pass`, //修改用户密码
//   SIGNUP: `${PREFIX.USER}system/user/sign-up`, //注册
//   SEND_EMAIL: `${PREFIX.USER}system/user/send-mail`, //发送验证码
//   QUERY_DEPTS: `${PREFIX.USER}system/dept/list`,
//   QUERY_IMG_CODE: `${PREFIX.USER}gateway/img-code`,
//   LOGOUT: `${PREFIX.USER}gateway/logout`,
//   QUERY_INFO: `${PREFIX.USER}system/user/token/info`,
//   QUERY_LIST: `${PREFIX.USER}/system/user/list`,
//   DELETE: (userId: string) => `${PREFIX.USER}/system/user/${userId}`,
//   UPDATE: `${PREFIX.USER}/system/user/info`,
//   CREATE: `${PREFIX.USER}/system/user/addUser`,
// };

// /** 用户 */
const USER = {
  /** 登录 */
  LOGIN: `${PREFIX.USER}login`,
  /** 登出 */
  LOGOUT: `${PREFIX.USER}logout`,
  /** 注册 */
  SIGNUP: `${PREFIX.SYSTEM_USER}`,
  /** 发送验证码 */
  SEND_EMAIL: `${PREFIX.SYSTEM_USER}send-mail`,
  /** 修改用户密码 (用邮箱修改) */
  MODIFY_PWD: `${PREFIX.SYSTEM_USER}modify-pass-by-email`,
  /** 修改用户密码 (用旧密码修改) */
  MODIFY_PWD2: `${PREFIX.SYSTEM_USER}modify-pass`,
  /** 查询验证码 */
  QUERY_IMG_CODE: `${PREFIX.USER}imgCode`,
  /** 查询用户信息 */
  QUERY_INFO: (userId: string | number) => `${PREFIX.SYSTEM_USER}${userId}`,
  /** 查询用户列表 */
  QUERY_LIST: `${PREFIX.SYSTEM_USER}query`,
  /** 新增用户 */
  CREATE: `${PREFIX.SYSTEM_USER}add`,
  /** 更新用户信息 */
  UPDATE: `${PREFIX.SYSTEM_USER}update`,
  /** 删除用户 */
  DELETE: (userId: string | number) => `${PREFIX.SYSTEM_USER}${userId}`,
};

export default USER;
