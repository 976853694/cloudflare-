## 🚀 部署

### ️ 1️ Cloudflare ToS 限制:

根据 Cloudflare ToS 2.2.1 (j):

🚫 **禁止** 在 Cloudflare 上实际架设和**使用本项目**

📚 **仅限** 学习在线代理实现方式

💻 或在自己的服务器上部署 Cloudflare 开源的 `worker-runtime`

❗ **否则后果自负**

### ℹ️ 2️⃣ 项目目的:

🎯 **仅用于学习** 在线代理的实现方式

️ 使用 `cloudflare-worker` 代码 **仅为方便编写**

**绝无任何引导目的**

### 🚨 3️ 风险提示 - Cloudflare 代理的潜在风险:

⚠️ **请务必注意以下风险，并自行承担所有后果！**

* ♂️ **真实 IP 泄露风险**:
    * 目标网站可能通过 `X-Forwarded-For`, `X-Real-Ip`, `Cf-Connecting-Ip` 等 HTTP 头获取您的真实 IP 地址。

* 🌐 **Worker 域名泄露**:
    * 目标网站可能会通过 `Cf-Worker` HTTP 头获知您的 Worker 域名。

### 4️⃣ 信息来源:

最初发现于:

[https://linux.do/t/topic/89856](https://linux.do/t/topic/89856)

### 5️⃣ 部署步骤:

🚪 **1. 登录 Cloudflare 控制台**:
    * 🔗 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

➕ **2. 创建应用程序**

✨ **3. 创建 Worker**

点击 "**部署**" 按钮

️ **4. 编辑代码**:
    * 复制 [Workers.js](https://github.com/976853694/cloudflare-/blob/main/Workers.js) 文件中的全部内容。

💾 **5. 点击 "保存并部署"**

### 用法

在任意网址前面加上 `https://你的域名/`，例如:

`https://你的域名/https://github.com`
