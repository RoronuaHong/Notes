// - 内存溢出
// - 白屏
//   - MutationObserver
// - 资源加载异常
//   - img 资源
//   - font 资源
// - js 执行异常
//   - 异常监听
// - 异步处理异常
//   - promise, unhandledrejection
// - 网络异常
//   - ajax
//   - fetch

// 1. 资源异常
function error() {
  // 监听整个文档的 error 事件，捕获所有资源加载错误
  window.addEventListener('error', function(event) {
    // 检查事件目标，判断是否为加载失败的资源
    if (event.target instanceof HTMLImageElement) {
      console.error('图片加载失败:', event.target.src);
    } else if (event.target instanceof HTMLScriptElement) {
      console.error('脚本加载失败:', event.target.src);
    } else if (event.target instanceof HTMLLinkElement) {
      console.error('CSS 文件加载失败:', event.target.href);
    }
  }, true); // 使用捕获阶段（true）来确保在冒泡之前捕获错误
}


// 2. js异常
window.onerror = (message, source, linen, colno, error) => {
  console.log('js执行异常: ', message, source, linen, colno, error)
}


// 3. promise错误
new Promise((resolve, reject) => {
  reject('Promise Error')
}).catch(err => {
  console.log(err)
})
