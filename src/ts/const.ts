export const nav = [
  {
    text: '产品',
    items: [
      {
        text: 'Essai',
        path: `https://essai.bluebones.fun`,
        desc: '线下实验招募平台',
      },
      {
        text: 'WPS-Paper',
        path: 'https://github.com/BluebonesOrg/wps-paper',
        desc: '辅助论文写作的WPS加载项',
      },
      {
        text: 'ptbk',
        path: 'https://github.com/BluebonesOrg/ptbk',
        desc: 'PsychToolbox 开发框架',
      },
    ],
  },
  {
    text: '认识我们',
    items: [
      {
        text: '团队',
        path: '/about',
        desc: '我们是一个年轻的非营利性组织',
      },
      {
        text: '加入',
        path: '/join',
        desc: '和我们一起探索科研工作的未来形态',
      },
      {
        text: '捐助',
        path: '/donate',
        desc: '共同促进脑科学发展',
      },
    ],
  },
  {
    text: '联系我们',
    items: [
      {
        text: 'QQ',
        path: 'https://qm.qq.com/q/214gmxUVKw',
        desc: '',
      },
      {
        text: 'Github',
        path: 'https://github.com/BluebonesOrg',
        desc: '',
      },
      {
        text: '爱发电',
        path: 'https://afdian.com/a/bluebones',
        desc: '',
      },
    ],
  },
] as const;
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
