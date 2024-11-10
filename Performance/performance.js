// - FP 首屏渲染
// - FCP 首次内容渲染
// - FMP 视团队而定
// - LCP 最大内容渲染
// - CLS 布局偏移 Mutation Observer
// - TTI 交互时间


// 浏览器提供了一个对象，让我们专门来做性能指标的计算 - Perforamance

// 1. 页面加载时间
function pageLoadTime() {
  // performance.timing 
  const time = performance.timing.loadEventEnd - performance.timing.navigationStart

  console.log(time)

  // 获取 PerformanceNavigationTiming 对象
  // let navigationData = performance.getEntriesByType("navigation")[0];

  // let totalLoadTime = navigationData.loadEventEnd - navigationData.startTime;

  // console.log("Total Page Load Time: ", navigationData, String(navigationData.loadEventEnd));
}

pageLoadTime()

// 2. 最大内容渲染
function lcp() {
  new PerformanceObserver(entryList => {
    const entries = entryList.getEntries()
    const lastEntry = entries[entries.length - 1]
    const lcpTime = lastEntry.startTime

    console.log(`LCP: ${lcpTime}`)
  }).observe({
    type: 'largest-contentful-paint',
    buffered: true
  })
}

lcp()


// 3. 交互时间
function tti() {
  const time = performance.timing.domInteractive - performance.timing.navigationStart

  console.log(time)
  // new PerformanceObserver(entryList => {
  //   const entries = entryList.getEntries()
  //   const lastEntry = entries[entries.length - 1]
  //   const ttiTime = lastEntry.startTime

  //   console.log(`TTI: ${ttiTime}`)
  // }).observe({
  //   type: 'largest-contentful-paint',
  //   buffered: true
  // })
}

tti()


// 4. 视团队而定
function fmp() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP: ' + entry.startTime + 'ms');
        }
  
        if (entry.name === 'first-meaningful-paint') {
          console.log('FMP: ' + entry.startTime + 'ms');
        }
      });
    });
  
    observer.observe({
      type: 'paint',
      buffered: true
    });  }
  
}

fmp()


// 5. 首次内容渲染
function fcp() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP: ' + entry.startTime + 'ms');
        }
      });
    });
  
    observer.observe({
      type: 'paint',
      buffered: true
    });
  }
}

fcp()


// 6. 布局偏移
function cls() {
  let cumulativeLayoutShiftScore = 0;
  let firstShift = false;

  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // 仅考虑无预期布局的变化（不包括用户交互导致的变化）
        if (!entry.hadRecentInput) {
          cumulativeLayoutShiftScore += entry.value;
          
          // 首次检测到布局偏移时打印
          if (!firstShift) {
            console.log('First Layout Shift detected:', entry);
            firstShift = true;
          }
        }
      });
    });

    observer.observe({
      type: 'layout-shift',
      buffered: true
    });

    // 输出累积的 CLS 分数
    window.addEventListener('load', () => {
      console.log('Cumulative Layout Shift (CLS):', cumulativeLayoutShiftScore);
    });
  }
}

cls()
