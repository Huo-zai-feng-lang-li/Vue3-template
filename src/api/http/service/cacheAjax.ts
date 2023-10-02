// 接口缓存 hook
import { Session } from "@/utils/storage";

type cacheTimestamp = 1 | 2 | 3 | 4 | 5;
/**
 * 接口缓存
 * @method requestIsCache
 * @param { string } payloadUrl 请求方法-/api地址 require
 * @param { number } responseConfigCacheFlag 1-5(分钟) 缓存阈值 require
 * @returns { Promise<any> } 返回一个Promise对象
 * @example
 * > 1. 在需要缓存的接口中添加 cache: true
 * > 2. import { requestIsCache} from '/@/utils/request'; // 引入缓存方法
 * > 3. requestIsCache('post-/menu/queryMenuTree', 1) // 注意先调用缓存接口，失败状态下在调用真实接口
 * @author zk
 * @createDate 2023/08/14 14:19:52
 * @lastFixDate 2023/08/14 14:19:52
 */
function requestIsCache(
  payloadUrl: string,
  responseConfigCacheFlag: cacheTimestamp
): Promise<any> {
  const keys = Object.keys(sessionStorage);
  // 本地是否有相同key
  if (keys.includes(payloadUrl)) {
    // 停留时间
    const stopover =
      Date.now() - JSON.parse(Session.get(payloadUrl))?.cacheTimestamp;
    const isCache = stopover > 1000 * 60 * responseConfigCacheFlag; // 停留时间 > 缓存时间阈值
    // console.log("停留时间", stopover);
    // console.log("判断阈值", 1000 * 60 * responseConfigCacheFlag);
    // console.log("本地是否有相同key", keys.includes(payloadUrl));
    // console.log("是否过期 ==>:", isCache); // 过期 true 未过期 false
    // 缓存未过期
    if (!isCache) {
      // 直接返回本地缓存数据
      const cacheData = Session.get(payloadUrl);
      return Promise.resolve(cacheData);
    } else {
      // 清除缓存
      Session.remove(payloadUrl);
      return Promise.reject("本地不存在当前接口缓存或者缓存已过期");
    }
  } else {
    return Promise.reject("本地不存在当前接口的缓存key");
  }
}

export default requestIsCache;
