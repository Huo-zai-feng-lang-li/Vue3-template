import { Session, getLocalKey } from "./storage";
/**
 * @description Q: 接口存于会话存储中此函数还要必要吗？不调用缓存接口不会清除吗？
 * @description A: 1：有，用于清除接口开启了缓存，但长时间未调用此接口且未关闭当前进程（页签）的缓存
 * @description    2：是，目前是这样的设计模式，会话存储数据是调用缓存接口时，发现过期了才会清除，或者关闭当前进程（页签）就会自动清除
 * @description 总结： 只有刷新页面和第一次进入页面时才会执行，
 * @author zk
 * @createDate 2023/08/19 16:02:02
 * @lastFixDate 2023/08/19 16:02:02
 */
export default () => {
  const arrKeys = getLocalKey(undefined, sessionStorage) as string[];
  if (!arrKeys.length) return; // 本地没有缓存终止执行
  const localKey = arrKeys.filter(
    (item) => item.includes("post-/") || item.includes("get-/")
  );
  if (!localKey.length) return; // 本地缓存中未找到接口缓存终止执行
  localKey.forEach((key) => {
    const item = Session.get(key);
    if (item && Date.now() - JSON.parse(item).cacheTimestamp > 1000 * 60 * 5) {
      // 5分钟未调用接口，清除缓存,因为缓存时间最多是5分钟
      Session.remove(key);
    }
  });
};
