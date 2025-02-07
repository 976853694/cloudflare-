addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
const specialCases = {
  "*": {
    "Origin": "DELETE",
    "Referer": "DELETE"
  }
}
function handleSpecialCases(request) {
  const url = new URL(request.url);
  const rules = specialCases[url.hostname] || specialCases["*"];
  for (const [key, value] of Object.entries(rules)) {
    switch (value) {
      case "KEEP":
        break;
      case "DELETE":
        request.headers.delete(key);
        break;
      default:
        request.headers.set(key, value);
        break;
    }
  }
}
async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return new Response(`<!DOCTYPE html>
    <!DOCTYPE html>
    <html lang="zh-CN">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>六趣反代理使用指南</title>
      <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;700&display=swap"
        rel="stylesheet">
      <style>
        /*  通用样式重置和基础设置  */
        body {
          font-family: 'M PLUS Rounded 1c', sans-serif; /*  更具二次元感的圆角字体 */
          line-height: 1.7;
          color: #555;
          background: linear-gradient(135deg, #fce4ec, #f3e5f5); /*  柔和渐变背景 */
          background-attachment: fixed; /* 固定背景，避免滚动时闪烁 */
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh; /*  确保 body 至少占据整个视口高度 */
        }
    
        .container {
          max-width: 960px;
          margin: 30px 20px; /* 增加顶部外边距 */
          padding: 40px; /*  增加容器内边距 */
          background-color: rgba(255, 255, 255, 0.95); /*  半透明白色背景，更柔和 */
          border-radius: 15px; /*  更圆润的边角 */
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /*  更深但更柔和的阴影 */
          overflow: hidden;
          backdrop-filter: blur(10px); /*  毛玻璃效果，增强层次感 */
        }
    
        header {
          text-align: center;
          padding: 35px 0;
          border-bottom: 3px dashed #e06497; /*  更粗的虚线，更鲜明的粉色 */
          margin-bottom: 35px;
        }
    
        header h1 {
          color: #e91e63; /*  保持鲜艳粉色 */
          font-size: 3.0em; /*  标题字体稍加大 */
          margin-bottom: 0.3em;
          font-weight: 700; /*  更粗的标题字体 */
          letter-spacing: 2px; /*  更大字间距 */
          text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05); /*  标题文字阴影 */
        }
    
        section {
          margin-bottom: 40px; /*  增加 section 间距 */
          padding: 30px; /*  增加 section 内边距 */
          background-color: rgba(248, 240, 251, 0.8); /*  更浅更透明的 section 背景 */
          border-radius: 12px;
          border: 2px solid rgba(238, 238, 238, 0.9); /*  稍粗和更透明的边框 */
          box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.06); /*  更柔和的 section 阴影 */
          backdrop-filter: blur(5px); /*  section 毛玻璃效果 */
        }
    
        section h2 {
          color: #333;
          font-size: 2.2em; /*  加大 h2 字体 */
          margin-top: 0;
          margin-bottom: 25px;
          border-bottom: 4px double #e06497; /*  更粗的双线，粉色 */
          padding-bottom: 10px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.03); /*  h2 文字阴影 */
        }
    
        section h3 {
          color: #555;
          font-size: 1.6em; /*  加大 h3 字体 */
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: 500; /*  稍加粗 h3 */
        }
    
        section p {
          color: #666;
          font-size: 1.15em; /*  稍微增大段落字体 */
          line-height: 1.9; /*  段落行高更微软一些 */
          margin-bottom: 25px; /*  增加段落底部外边距 */
        }
    
        section ol {
          padding-left: 35px; /*  增加列表左内边距 */
          margin-bottom: 25px; /*  增加列表底部外边距 */
        }
    
        section ol li {
          margin-bottom: 12px;
        }
    
        section code {
          background-color: rgba(240, 240, 240, 0.7); /*  更透明的 code 背景 */
          color: #444;
          padding: 4px 10px; /*  增加 code 内边距 */
          border-radius: 7px;
          font-family: 'Consolas', 'Courier New', monospace;
          font-size: 0.95em;
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05); /*  code 阴影 */
        }
    
        .example {
          background-color: rgba(240, 248, 255, 0.7); /*  更透明的示例背景 */
          border-color: #90caf9; /*  更柔和的示例边框颜色 */
          border-style: dashed;
          border-width: 2px; /*  示例边框加粗 */
          padding: 25px; /*  示例区域内边距 */
          border-radius: 10px; /*  示例区域圆角 */
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.04); /*  示例区域阴影 */
          backdrop-filter: blur(5px); /*  示例区域毛玻璃效果 */
        }
    
        .example h3 {
          color: #1e88e5; /*  示例标题颜色，更深的蓝色 */
          font-weight: 600; /*  示例标题加粗 */
        }
    
        /*  强调免责声明部分  */
        section:last-of-type {
          background-color: rgba(255, 249, 196, 0.7); /*  更透明的免责声明背景 */
          border-color: #ffe082; /*  更柔和的免责声明边框颜色 */
          box-shadow: 4px 4px 14px rgba(255, 235, 59, 0.15); /*  更柔和的免责声明阴影 */
          backdrop-filter: blur(5px); /*  免责声明毛玻璃效果 */
        }
    
        section:last-of-type h2,
        section:last-of-type h3 {
          color: #ffb300; /*  免责声明标题颜色，更深的警告色 */
          font-weight: 600; /*  免责声明标题加粗 */
        }
    
        /*  响应式设计 (简单示例)  */
        @media (max-width: 768px) {
          .container {
            padding: 30px;
            margin: 20px;
          }
    
          header h1 {
            font-size: 2.6em;
          }
    
          section h2 {
            font-size: 2.0em;
          }
    
          .proxy-input-area {
            flex-direction: column; /*  小屏幕上垂直排列输入框和按钮 */
            align-items: stretch; /*  拉伸对齐 */
          }
    
          .proxy-input-area input[type="text"] {
            max-width: 100%; /*  小屏幕上输入框宽度撑满 */
            margin-bottom: 15px; /*  输入框和按钮间距 */
          }
        }
    
        /*  输入框和按钮样式 - 二次元风格  */
        .proxy-input-area {
          display: flex;
          gap: 20px; /*  增加间距 */
          align-items: center;
          justify-content: center;
          margin-top: 20px; /*  增加与上方的间距 */
        }
    
        .proxy-input-area input[type="text"] {
          padding: 14px; /*  增加内边距 */
          border: 2px solid #90caf9; /*  更亮的浅蓝色边框 */
          border-radius: 10px; /*  更圆润 */
          flex-grow: 1;
          max-width: 400px; /*  稍加大最大宽度 */
          font-size: 1.1em; /*  加大输入框字体 */
          background-color: rgba(245, 250, 255, 0.8); /*  更透明的背景 */
          box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.06); /*  更明显的内阴影 */
          transition: border-color 0.3s ease, box-shadow 0.3s ease; /*  阴影过渡 */
        }
    
        .proxy-input-area input[type="text"]:focus {
          border-color: #4fc3f7; /*  聚焦时更亮的边框颜色 */
          outline: none;
          box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.06), 0 0 8px rgba(79, 195, 247, 0.4); /*  更明显的外阴影 */
        }
    
    
        .proxy-input-area button {
          padding: 14px 30px; /*  加大按钮内边距 */
          border: none;
          border-radius: 10px; /*  更圆润 */
          background-color: #ff4081; /*  保持鲜艳粉色 */
          color: white;
          cursor: pointer;
          font-size: 1.2em; /*  加大按钮字体 */
          font-weight: 500;
          box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2); /*  更明显的按钮阴影 */
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease; /*  阴影过渡 */
        }
    
        .proxy-input-area button:hover {
          background-color: #f50057;
          transform: translateY(-3px); /*  悬停时上移更多 */
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25); /*  更明显的悬停阴影 */
        }
    
        .proxy-input-area button:active {
          transform: translateY(0);
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2); /*  点击时阴影 */
        }
      </style>
    </head>
    
    <body>
      <header>
        <h1>六趣反代理</h1>
      </header>
      <div class="container">
        <section>
          <h2>简介</h2>
          <p>本服务是一个轻量级的https请求转发代理，可以帮助您绕过某些网络限制，或者在开发过程中模拟https请求。以提供快速且安全的服务体验。</p>
        </section>
        <section>
          <h2>如何使用</h2>
          <p>使用转发服务非常简单，只需遵循以下步骤：</p>
          <ol>
            <li>确定您想要访问的目标URL。</li>
            <li>根据您的需求选择相应的转发服务域名。</li>
            <li>在浏览器地址栏输入我们的转发服务URL，并在其后附加目标URL的完整路径。</li>
            <li>按下回车键，我们的服务将自动将请求转发到目标URL。</li>
          </ol>
        </section>
        <section>
          <h2>自定义代理访问</h2>
          <p>输入您想要代理访问的域名，例如： <code>example.com</code></p>
          <div class="proxy-input-area">
            <input type="text" id="domainInput" placeholder="请输入域名">
            <button id="proxyButton">代理</button>
          </div>
        </section>
        <section>
          <h2>通用转发服务</h2>
          <p>对于不提供专门转发接口的网站，您可以继续使用我们的通用转发服务。</p>
          <section class="example">
            <h3>通用转发示例</h3>
            <p><strong>转发服务域名：</strong><code>https://ai.6qu.us.kg/</code></p>
            <p><strong>示例：</strong>要访问<code>https://example.com/api/data</code>，请使用以下URL：</p>
            <p><code>https://ai.6qu.us.kg/https://example.com/api/data</code></p>
          </section>
        </section>
        <section>
          <h2>注意事项</h2>
          <p>在使用转发服务时，请仔细阅读并遵守以下条款：</p>
          <h3>遵守使用条款</h3>
          <p>您必须遵守目标网站的使用条款和条件。本服务仅作为请求转发的中介，并不对目标网站的内容或服务负责。</p>
          <h3>隐私和数据安全</h3>
          <p>保护您的个人隐私和数据安全至关重要。请不要通过本服务发送任何敏感或个人身份信息，除非您已经确认目标网站具有足够的安全措施。</p>
          <h3>版权和知识产权</h3>
          <p>您应确保在使用本服务转发内容时，不侵犯任何第三方的版权或知识产权。对于因违反版权或知识产权法律而导致的任何争议或法律责任，您应自行承担。</p>
          <h3>服务限制</h3>
          <p>本服务有可能会限制请求的数量、频率或大小。请合理使用服务，避免对服务或目标网站造成不必要的负担。</p>
          <h3>免责声明</h3>
          <p>本服务提供“按原样”的转发服务，不提供任何形式的保证。我们不对通过本服务转发的内容的准确性、可靠性或质量负责，也不对因使用本服务而可能遭受的任何损失或损害承担责任。</p>
          <h3>服务变更和中断</h3>
          <p>我们保留随时修改、更新或中断服务的权利，无需事先通知。我们不承担因服务变更或中断而造成的任何责任。</p>
          <h3>用户行为</h3>
          <p>您应确保在使用服务时遵守所有适用的法律和规定，不进行任何非法活动或恶意行为，包括但不限于网络攻击、数据爬取或任何形式的网络欺诈。</p>
        </section>
        <section>
          <h2>免责声明</h2>
          <p><strong>免责声明：</strong></p>
          <p>· 使用本转发服务时，您应自行承担风险。我们不保证服务的及时性、安全性、可用性或准确性。对于因使用或无法使用本服务而造成的任何直接、间接、特殊或后果性损害，我们不承担任何责任。</p>
          <p>· 我们不对通过本服务转发的内容承担责任，包括但不限于版权、商标或其他知识产权问题。您应确保您有权转发目标URL的内容，并且遵守所有适用的法律和规定。</p>
          <p>· 我们保留随时修改或中断服务的权利，无需事先通知。本服务不提供任何形式的保证或条件，无论是明示的还是暗示的。</p>
          <p>· 该服务不收取任何费用，使用开源代码创建，如果本服务侵犯了任何您的权利以及现有条款，我们将立刻关闭该服务。</p>
        </section>
      </div>
    
      <script>
        document.getElementById('proxyButton').addEventListener('click', function () {
          const domain = document.getElementById('domainInput').value;
          if (domain) {
            const proxyUrl = 'https://ai.6qu.us.kg/' + 'https://' + domain; // 默认使用 https，可以根据需要调整
            window.location.href = proxyUrl;
          } else {
            alert('请输入域名');
          }
        });
      </script>
    </body>
    
    </html>
    

    


    `,{
  headers: {
    'content-type': 'text/html;charset=UTF-8',
  },
  status: 200 // 确保状态码是200
});
  };
  const actualUrlStr = url.pathname.replace("/", "") + url.search + url.hash;
  const actualUrl = new URL(actualUrlStr);
  const modifiedRequest = new Request(actualUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });
  handleSpecialCases(modifiedRequest);
  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse;
}
