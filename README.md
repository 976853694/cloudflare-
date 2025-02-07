## 🚀 部署

### ️ 1️ Cloudflare ToS 限制:

根据 Cloudflare ToS 2.2.1 (j):

🚫 **禁止** 在 Cloudflare 上实际架设和使用本项目

📚 **仅限** 学习在线代理实现方式

💻 或在自己的服务器上部署 Cloudflare 开源的 worker-runtime

❗ **否则后果自负**

### ℹ️ 2️⃣ 项目目的:

🎯 **仅用于学习** 在线代理的实现方式

️ 使用 `cloudflare-worker` 代码 **仅为方便编写**

**绝无任何引导目的**

### 🚨 3️ 风险提示 - Cloudflare 代理的潜在风险:

️♂️ **真实 IP 泄露风险**:
    * 通过 `X-Forwarded-For`, `X-Real-Ip`, `Cf-Connecting-Ip` 传递给目标网站

Worker 域名泄露:
    * 通过 `Cf-Worker` 发送给目标网站

### 4️⃣ 信息来源:

最初发现于:

[https://linux.do/t/topic/89856](https://linux.do/t/topic/89856)

### 5️⃣ 部署步骤:

🚪 **登录 Cloudflare 控制台**:
    * 🔗 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

➕ **创建应用程序**

✨ **创建 Worker**

点击 "**部署**" 按钮

️ **编辑代码**
    * 复制 `worker.js` 文件内容

💾 点击 "**保存并部署**"

### 用法

在任意网址前面加上 `https://你的域名/`，例如:

`https://你的域名/https://github.com`
