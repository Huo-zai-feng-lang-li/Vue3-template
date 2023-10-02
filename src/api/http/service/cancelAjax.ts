// 取消重复请求、取消全部请求、取消当前请求 hook
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { ElMessage } from "element-plus";

// requestKey用于缓存接口函数 判断是否存在相同的请求
let requestKey = "";
// 创建一个存储请求的Map对象
const pendingRequests: Map<string, CancelTokenSource> = new Map();

// 取消重复请求的方法
const cancelDuplicateRequest = (config: AxiosRequestConfig): void => {
  requestKey = `${config.method}-${config.url}`; // 生成请求的唯一标识
  // 如果已经存在该请求，则取消该请求
  if (pendingRequests.has(requestKey)) {
    const cancelToken = pendingRequests.get(requestKey);
    cancelToken?.cancel(
      "进行中的重复请求被拦截，请您等待当前请求完成后再发起请求"
    );
  }
  const cancelToken = axios.CancelToken.source(); // 生成一个取消请求的标识
  pendingRequests.set(requestKey, cancelToken); // 将该请求保存到 pendingRequests 中
  config.cancelToken = cancelToken.token; // 设置取消请求的标识
};

// 取消全部请求的方法
const cancelAllRequest = (): void => {
  // 创建一个标记 是否取消成功，初始值为false
  let hasCancelled = false;

  // 遍历所有待处理的请求
  pendingRequests.forEach((value) => {
    // 如果请求还没有完成
    if (!value.isFinished) {
      // 取消请求
      value.cancel();
      // 将标记设为true
      hasCancelled = true;
    }
  });

  // 清空待处理请求的集合
  pendingRequests.clear();

  // 至少取消了一个请求，显示提示,防止都是成功请求点击取消按钮时也提示
  if (hasCancelled) {
    ElMessage.success("成功取消全部请求");
  }
};

/**
 * 取消当前请求的方法
 * @param { string } payloadCurrentKey 当前请求的key
 * @description 传入当前请求的key，取消当前请求，如果不传则取消最后一个请求
 * @example>
 * 1.import { cancelCurrentRequest } from "-/service";
 * 2.cancelCurrentRequest("get-ai/chat");
 * @author zk
 * @createDate 2023/09/16 13:49:21
 * @lastFixDate 2023/09/16 13:49:21
 */
const cancelCurrentRequest = (payloadCurrentKey: string = requestKey): void => {
  // 遍历所有待处理的请求
  pendingRequests.forEach((value, key) => {
    // 传过来key和请求的key相同，且请求还没有完成
    if (key === payloadCurrentKey && !value.isFinished) {
      value.cancel();
      pendingRequests.delete(key);
      ElMessage.success("成功取消当前请求");
    }
  });
};

export {
  requestKey,
  pendingRequests,
  cancelDuplicateRequest,
  cancelCurrentRequest,
  cancelAllRequest,
};
