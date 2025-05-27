
import type { TVCategory } from './types';

const fanmingmingBaseUrl = 'https://live.fanmingming.com/tv';
const fanmingmingHlsBaseUrl = 'https://live.fanmingming.com/tv';

// Helper to construct HLS URLs, assuming channel IDs in data are lowercase
// and stream URLs require uppercase IDs.
const getHlsStreamUrl = (id: string) => `${fanmingmingHlsBaseUrl}/${id.toUpperCase()}.m3u8`;

export const tvCategoriesData: TVCategory[] = [
  {
    name: '央视频道', // CCTV Channels
    channels: [
      { id: 'cctv1', name: 'CCTV-1 综合', logoUrl: `${fanmingmingBaseUrl}/CCTV1.png`, streamUrl: getHlsStreamUrl('cctv1'), category: '央视频道' },
      { id: 'cctv2', name: 'CCTV-2 财经', logoUrl: `${fanmingmingBaseUrl}/CCTV2.png`, streamUrl: getHlsStreamUrl('cctv2'), category: '央视频道' },
      { id: 'cctv3', name: 'CCTV-3 综艺', logoUrl: `${fanmingmingBaseUrl}/CCTV3.png`, streamUrl: getHlsStreamUrl('cctv3'), category: '央视频道' },
      { id: 'cctv4', name: 'CCTV-4 中文国际', logoUrl: `${fanmingmingBaseUrl}/CCTV4.png`, streamUrl: getHlsStreamUrl('cctv4'), category: '央视频道' },
      { id: 'cctv5', name: 'CCTV-5 体育', logoUrl: `${fanmingmingBaseUrl}/CCTV5.png`, streamUrl: getHlsStreamUrl('cctv5'), category: '央视频道' },
      { id: 'cctv5plus', name: 'CCTV-5+ 体育赛事', logoUrl: `${fanmingmingBaseUrl}/CCTV5+.png`, streamUrl: getHlsStreamUrl('cctv5plus'), category: '央视频道' },
      { id: 'cctv6', name: 'CCTV-6 电影', logoUrl: `${fanmingmingBaseUrl}/CCTV6.png`, streamUrl: getHlsStreamUrl('cctv6'), category: '央视频道' },
      { id: 'cctv7', name: 'CCTV-7 国防军事', logoUrl: `${fanmingmingBaseUrl}/CCTV7.png`, streamUrl: getHlsStreamUrl('cctv7'), category: '央视频道' },
      { id: 'cctv8', name: 'CCTV-8 电视剧', logoUrl: `${fanmingmingBaseUrl}/CCTV8.png`, streamUrl: getHlsStreamUrl('cctv8'), category: '央视频道' },
      { id: 'cctv9', name: 'CCTV-9 纪录', logoUrl: `${fanmingmingBaseUrl}/CCTV9.png`, streamUrl: getHlsStreamUrl('cctv9'), category: '央视频道' },
      { id: 'cctv10', name: 'CCTV-10 科教', logoUrl: `${fanmingmingBaseUrl}/CCTV10.png`, streamUrl: getHlsStreamUrl('cctv10'), category: '央视频道' },
      { id: 'cctv11', name: 'CCTV-11 戏曲', logoUrl: `${fanmingmingBaseUrl}/CCTV11.png`, streamUrl: getHlsStreamUrl('cctv11'), category: '央视频道' },
      { id: 'cctv12', name: 'CCTV-12 社会与法', logoUrl: `${fanmingmingBaseUrl}/CCTV12.png`, streamUrl: getHlsStreamUrl('cctv12'), category: '央视频道' },
      { id: 'cctv13', name: 'CCTV-13 新闻', logoUrl: `${fanmingmingBaseUrl}/CCTV13.png`, streamUrl: getHlsStreamUrl('cctv13'), category: '央视频道' },
      { id: 'cctv14', name: 'CCTV-14 少儿', logoUrl: `${fanmingmingBaseUrl}/CCTV14.png`, streamUrl: getHlsStreamUrl('cctv14'), category: '央视频道' },
      { id: 'cctv15', name: 'CCTV-15 音乐', logoUrl: `${fanmingmingBaseUrl}/CCTV15.png`, streamUrl: getHlsStreamUrl('cctv15'), category: '央视频道' },
      { id: 'cctv16', name: 'CCTV-16 奥林匹克', logoUrl: `${fanmingmingBaseUrl}/CCTV16.png`, streamUrl: getHlsStreamUrl('cctv16'), category: '央视频道' },
      { id: 'cctv17', name: 'CCTV-17 农业农村', logoUrl: `${fanmingmingBaseUrl}/CCTV17.png`, streamUrl: getHlsStreamUrl('cctv17'), category: '央视频道' },
    ],
  },
  {
    name: '卫视频道', // Provincial Satellite Channels
    channels: [
      { id: 'hunantv', name: '湖南卫视', logoUrl: `${fanmingmingBaseUrl}/HunanTV.png`, streamUrl: getHlsStreamUrl('hunantv'), category: '卫视频道' },
      { id: 'zhejiangtv', name: '浙江卫视', logoUrl: `${fanmingmingBaseUrl}/ZhejiangTV.png`, streamUrl: getHlsStreamUrl('zhejiangtv'), category: '卫视频道' },
      { id: 'jiangxutv', name: '江苏卫视', logoUrl: `${fanmingmingBaseUrl}/JiangsuTV.png`, streamUrl: getHlsStreamUrl('jiangxutv'), category: '卫视频道' },
      { id: 'dongfangtv', name: '东方卫视', logoUrl: `${fanmingmingBaseUrl}/DongfangTV.png`, streamUrl: getHlsStreamUrl('dongfangtv'), category: '卫视频道' },
      { id: 'beijingtv', name: '北京卫视', logoUrl: `${fanmingmingBaseUrl}/BeijingTV.png`, streamUrl: getHlsStreamUrl('beijingtv'), category: '卫视频道' },
      { id: 'anhuitv', name: '安徽卫视', logoUrl: `${fanmingmingBaseUrl}/AnhuiTV.png`, streamUrl: getHlsStreamUrl('anhuitv'), category: '卫视频道' },
      { id: 'guangdongtv', name: '广东卫视', logoUrl: `${fanmingmingBaseUrl}/GuangdongTV.png`, streamUrl: getHlsStreamUrl('guangdongtv'), category: '卫视频道' },
      { id: 'shenzhentv', name: '深圳卫视', logoUrl: `${fanmingmingBaseUrl}/ShenzhenTV.png`, streamUrl: getHlsStreamUrl('shenzhentv'), category: '卫视频道' },
      { id: 'sichuantv', name: '四川卫视', logoUrl: `${fanmingmingBaseUrl}/SichuanTV.png`, streamUrl: getHlsStreamUrl('sichuantv'), category: '卫视频道' },
      { id: 'liaoningtv', name: '辽宁卫视', logoUrl: `${fanmingmingBaseUrl}/LiaoningTV.png`, streamUrl: getHlsStreamUrl('liaoningtv'), category: '卫视频道' },
    ],
  },
  {
    name: '地方频道', // Local Channels (Simplified)
    channels: [
      { id: 'btvdoc', name: '北京纪实科教', logoUrl: `${fanmingmingBaseUrl}/BTVJishikejiao.png`, streamUrl: getHlsStreamUrl('btvjishikejiao'), category: '地方频道' },
      { id: 'btvys', name: '北京文艺', logoUrl: `${fanmingmingBaseUrl}/BTVKejiaowenyi.png`, streamUrl: getHlsStreamUrl('btvkejiaowenyi'), category: '地方频道' },
      { id: 'shanghaidfyx', name: '上海东方影视', logoUrl: `${fanmingmingBaseUrl}/DongfangYingshi.png`, streamUrl: getHlsStreamUrl('dongfangyingshi'), category: '地方频道' },
      { id: 'gzcomp', name: '广州综合频道', logoUrl: `${fanmingmingBaseUrl}/GuangzhouTV1.png`, streamUrl: getHlsStreamUrl('guangzhoutv1'), category: '地方频道' },
    ],
  },
  {
    name: '港澳频道', // Hong Kong & Macau Channels
    channels: [
      { id: 'phoenixc', name: '凤凰卫视中文台', logoUrl: `${fanmingmingBaseUrl}/PhoenixChinese.png`, streamUrl: getHlsStreamUrl('phoenixchinese'), category: '港澳频道' },
      { id: 'phoenixi', name: '凤凰卫视资讯台', logoUrl: `${fanmingmingBaseUrl}/PhoenixInfo.png`, streamUrl: getHlsStreamUrl('phoenixinfo'), category: '港澳频道' },
      { id: 'tvbjade', name: 'TVB翡翠台', logoUrl: `${fanmingmingBaseUrl}/TVBJade.png`, streamUrl: getHlsStreamUrl('tvbjade'), category: '港澳频道' },
      { id: 'viutv', name: 'ViuTV', logoUrl: `${fanmingmingBaseUrl}/ViuTV.png`, streamUrl: getHlsStreamUrl('viutv'), category: '港澳频道' },
    ],
  },
  {
    name: '台湾频道', // Taiwan Channels
    channels: [
      { id: 'tvbsnews', name: 'TVBS新闻台', logoUrl: `${fanmingmingBaseUrl}/TVBSNews.png`, streamUrl: getHlsStreamUrl('tvbsnews'), category: '台湾频道' },
      { id: 'ctinews', name: '中天新闻台', logoUrl: `${fanmingmingBaseUrl}/CTINews.png`, streamUrl: getHlsStreamUrl('ctinews'), category: '台湾频道' },
      { id: 'eranews', name: '年代新闻', logoUrl: `${fanmingmingBaseUrl}/ERANews.png`, streamUrl: getHlsStreamUrl('eranews'), category: '台湾频道' },
      { id: 'ftvnews', name: '民视新闻台', logoUrl: `${fanmingmingBaseUrl}/FTVNews.png`, streamUrl: getHlsStreamUrl('ftvnews'), category: '台湾频道' },
    ],
  },
  {
    name: '海外精选', // Overseas Selection
    channels: [
      { id: 'hbo', name: 'HBO Asia', logoUrl: `${fanmingmingBaseUrl}/HBOAsia.png`, streamUrl: getHlsStreamUrl('hboasia'), category: '海外精选' },
      { id: 'discovery', name: 'Discovery Asia', logoUrl: `${fanmingmingBaseUrl}/DiscoveryAsia.png`, streamUrl: getHlsStreamUrl('discoveryasia'), category: '海外精选' },
      { id: 'natgeo', name: 'National Geographic Asia', logoUrl: `${fanmingmingBaseUrl}/NatGeoAsia.png`, streamUrl: getHlsStreamUrl('natgeoasia'), category: '海外精选' },
      { id: 'cnbc', name: 'CNBC Asia', logoUrl: `${fanmingmingBaseUrl}/CNBCAsia.png`, streamUrl: getHlsStreamUrl('cnbcasia'), category: '海外精选' },
    ],
  },
  {
    name: '体育频道', // Sports Channels
    channels: [
        { id: 'cctv5_sport', name: 'CCTV-5 体育', logoUrl: `${fanmingmingBaseUrl}/CCTV5.png`, streamUrl: getHlsStreamUrl('cctv5'), category: '体育频道' }, // Uses main cctv5 stream
        { id: 'cctv5plus_sport', name: 'CCTV-5+ 体育赛事', logoUrl: `${fanmingmingBaseUrl}/CCTV5+.png`, streamUrl: getHlsStreamUrl('cctv5plus'), category: '体育频道' }, // Uses main cctv5+ stream
        { id: 'gd_sport', name: '广东体育', logoUrl: `${fanmingmingBaseUrl}/GuangdongSports.png`, streamUrl: getHlsStreamUrl('guangdongsports'), category: '体育频道' },
        { id: 'bt_sport', name: '北京体育休闲', logoUrl: `${fanmingmingBaseUrl}/BJRadioSports.png`, streamUrl: getHlsStreamUrl('bjradiosports'), category: '体育频道' },
    ],
  },
  {
    name: '少儿频道', // Kids Channels
    channels: [
        { id: 'cctv14_kids', name: 'CCTV-14 少儿', logoUrl: `${fanmingmingBaseUrl}/CCTV14.png`, streamUrl: getHlsStreamUrl('cctv14'), category: '少儿频道' }, // Uses main cctv14 stream
        { id: 'kaku', name: '卡酷少儿', logoUrl: `${fanmingmingBaseUrl}/Kaku.png`, streamUrl: getHlsStreamUrl('kaku'), category: '少儿频道' },
        { id: 'tooneed', name: '金鹰卡通', logoUrl: `${fanmingmingBaseUrl}/Toonmax.png`, streamUrl: getHlsStreamUrl('toonmax'), category: '少儿频道' }, // Using Toonmax for Jinying
    ],
  },
  {
    name: '电影轮播', // Movie Loop
    channels: [
        { id: 'cctv6_movie', name: 'CCTV-6 电影', logoUrl: `${fanmingmingBaseUrl}/CCTV6.png`, streamUrl: getHlsStreamUrl('cctv6'), category: '电影轮播' }, // Uses main cctv6 stream
        { id: 'chcmovie', name: 'CHC家庭影院', logoUrl: `${fanmingmingBaseUrl}/CHCJiatingyingyuan.png`, streamUrl: getHlsStreamUrl('chcjiatingyingyuan'), category: '电影轮播' },
        { id: 'hbo_movie', name: 'HBO Hits', logoUrl: `${fanmingmingBaseUrl}/HBOHits.png`, streamUrl: getHlsStreamUrl('hbohits'), category: '电影轮播' },
    ],
  },
  {
    name: '4K专区', // 4K Zone
    channels: [
        { id: 'cctv4k', name: 'CCTV-4K 超高清', logoUrl: `${fanmingmingBaseUrl}/CCTV4K.png`, streamUrl: getHlsStreamUrl('cctv4k'), category: '4K专区' },
    ],
  },
   {
    name: '自定义', // Custom
    channels: [
        // 示例：在此处添加你自己的频道。
        // 请将下面的 'custom_channel_1', '自定义频道1 (示例)', 占位符 logoUrl, 和占位符 streamUrl
        // 替换为你从 https://github.com/ngo5/IPTV 或其他M3U源中找到的真实数据。
        // 确保 streamUrl 指向一个有效的 HLS (.m3u8) 直播流。
        { 
          id: 'custom_channel_1', 
          name: '自定义频道1 (示例)', 
          logoUrl: 'https://via.placeholder.com/160x90.png?text=Channel+Logo+1', // 替换为真实的 Logo URL，或留空
          streamUrl: 'http://example.com/path/to/your/stream1.m3u8', // 重要：替换为真实的直播流 URL
          category: '自定义' 
        },
        { 
          id: 'custom_channel_2', 
          name: '自定义频道2 (示例)', 
          logoUrl: 'https://via.placeholder.com/160x90.png?text=Channel+Logo+2', // 替换为真实的 Logo URL，或留空
          streamUrl: 'http://example.com/another/live/stream2.m3u8', // 重要：替换为真实的直播流 URL
          category: '自定义' 
        }
        // 你可以根据需要复制粘贴上面的结构来添加更多自定义频道。
    ]
  } // Removed trailing comma here
];
