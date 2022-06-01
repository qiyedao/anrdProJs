import { join } from 'path';
export default [
  {
    requestLibPath: "import request from '@/utils/request'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
    projectName: 'swagger2',
  },
  // {
  //   requestLibPath: "import request from '@/utils/request'",
  //   schemaPath:
  //     'http://106.15.206.62:8097/v2/api-docs?group=%E5%85%A8%E9%83%A8%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3',
  //   projectName: 'swagger',
  // },
];
