
# YouycgTV - 一个简洁优雅的在线 IPTV 播放器

YouycgTV 是一个基于 Web 技术的 IPTV 播放器应用，允许用户通过 M3U 直播源 URL 动态加载、浏览和观看电视频道。它拥有精心设计的暗色主题界面，支持频道分类、实时播放、自定义直播源，并能将用户的自定义源持久化存储。

<!-- 
**在线演示 (Demo)**: [部署成功后，请替换成你的 GitHub Pages 或其他托管平台的链接](https://your-username.github.io/your-repository-name/) 
-->

## ✨ 主要功能

*   **动态 M3U 源加载**：支持通过 URL 从网络加载和解析 M3U 播放列表。
*   **自定义直播源**：用户可以通过美观的模态框在应用内输入、更改和保存自定义的 M3U 直播源 URL。
*   **持久化自定义源**：用户设置的自定义 M3U URL 会保存在浏览器的 `localStorage` 中，方便下次访问时自动加载。
*   **频道分类浏览**：根据 M3U 文件中的 `group-title` 属性自动对频道进行分类，并在侧边栏展示。
*   **实时视频播放**：集成 HLS.js 库，以实现对 HLS (m3u8) 直播流的流畅播放。
*   **响应式与美观设计**：采用 Tailwind CSS 构建，拥有现代、精致的暗色主题界面，注重用户体验和视觉细节，在不同设备尺寸上均有良好表现。
*   **加载与错误状态处理**：为用户提供清晰的加载指示、详细的错误提示和友好的空状态反馈。
*   **辅助功能**：关注可访问性，例如为可交互元素提供焦点样式。

## 🛠️ 技术栈

*   **React 19** (`react@^19.1.0`)：用于构建用户界面的核心 JavaScript 库。
*   **TypeScript**：为 JavaScript 添加了静态类型，增强了代码的健壮性和可维护性。
*   **Tailwind CSS** (via CDN)：一个功能优先的 CSS 框架，用于快速构建自定义用户界面。
*   **HLS.js** (via CDN)：一个 JavaScript 库，用于在浏览器中播放 HTTP Live Streaming (HLS) 内容。
*   **ESM (via esm.sh)**：直接在浏览器中通过 CDN 高效加载 React, ReactDOM 等模块，无需本地构建步骤。

## 📂 项目结构

```
.
├── components/                 # React UI 组件
│   ├── ChannelCard.tsx         # 频道卡片组件 (显示频道 Logo 和名称)
│   ├── ChannelGrid.tsx         # 频道网格布局组件
│   ├── Header.tsx              # 应用顶部栏，包含标题和设置入口
│   ├── PlayerView.tsx          # 视频播放器核心视图，集成 HLS.js
│   ├── Sidebar.tsx             # 频道分类侧边栏导航
│   ├── SourceEditor.tsx        # 直播源编辑/管理模态框组件
│   └── icons.tsx               # SVG 图标集合组件
├── App.tsx                     # 主应用组件，管理整体状态、数据获取和核心逻辑
├── index.html                  # 应用的入口 HTML 文件，引入 CDN 依赖和样式
├── index.tsx                   # React 应用的入口脚本，初始化 React Root
├── metadata.json               # 应用元数据 (名称、描述等)
├── types.ts                    # TypeScript 类型定义 (如 TVCategory, TVChannel)
├── data.ts                     # 包含一些静态的频道数据示例 (当前应用主要从 M3U 动态加载)
└── README.md                   # 本文档
```

## 🚀 本地运行

由于本项目直接使用 CDN 加载所有主要依赖项（React, Tailwind CSS, HLS.js）并通过浏览器原生的 ES Modules 运行，本地启动非常简单：

1.  **克隆仓库 (可选，如果你已拥有文件则跳过)**:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git # 替换为你的仓库地址
    cd your-repository-name
    ```
2.  **直接在浏览器中打开**:
    用任何现代浏览器（如 Chrome, Firefox, Edge, Safari）直接打开项目根目录下的 `index.html` 文件。

3.  **使用本地 HTTP 服务器 (推荐)**:
    为了避免某些浏览器在直接从本地文件系统加载时可能产生的限制 (例如某些 API 请求或模块解析行为)，推荐使用一个简单的本地 HTTP 服务器。
    *   如果你安装了 Node.js，可以在项目根目录下运行：
        ```bash
        npx serve .
        ```
    *   如果你安装了 Python，可以在项目根目录下运行：
        ```bash
        python -m http.server 8000 # 或者 python3 -m http.server 8000
        ```
    然后在浏览器中访问服务器提供的地址 (通常是 `http://localhost:3000` 或 `http://localhost:8000`)。

## ⚙️ 工作原理

1.  **初始化与数据源**:
    *   应用启动时，会首先尝试从浏览器的 `localStorage` 中读取用户上次保存的自定义 M3U URL。
    *   如果未找到自定义 URL，则使用在 `App.tsx` 中定义的 `DEFAULT_M3U_URL`。
2.  **数据获取与解析**:
    *   `App.tsx` 中的 `fetchData` 函数负责异步获取指定 URL 的 M3U 播放列表文本。
    *   获取到的 M3U 文本内容会被逐行解析，提取 `#EXTINF` 标签中的频道元数据（如 `tvg-id`, `tvg-name`, `tvg-logo`, `group-title`）以及紧随其后的直播流 URL。
    *   如果某些元数据缺失（如 `tvg-id`），会基于频道名称和流 URL 生成一个哈希值作为备用 ID。
3.  **频道与分类构建**:
    *   解析后的频道会根据 `group-title`（分类名称）进行组织。
    *   最终构建成 `TVCategory[]` 结构，其中每个分类包含其下的频道列表 (`TVChannel[]`)。
4.  **UI 渲染**:
    *   `Sidebar.tsx` 组件展示所有频道分类，用户可以选择一个分类。
    *   `ChannelGrid.tsx` 组件以卡片形式 (`ChannelCard.tsx`) 网格化展示当前选中分类下的所有频道。
    *   频道卡片会尝试加载 `tvg-logo` 指定的台标，如果失败则显示频道名称。
5.  **视频播放**:
    *   当用户点击一个频道卡片时，`PlayerView.tsx` 组件会被激活。
    *   `PlayerView.tsx` 使用 HLS.js 库加载并播放对应频道的 HLS (`.m3u8`) 直播流。它处理加载、播放、错误等状态，并提供用户反馈。
6.  **直播源管理**:
    *   用户可以通过 `Header.tsx` 中的设置按钮打开 `SourceEditor.tsx` 模态框。
    *   在模态框中，用户可以输入新的 M3U URL 来加载新的频道列表，或者选择恢复到默认的直播源。
    *   成功加载新的自定义源后，该 URL 会被保存在 `localStorage` 中，以便下次打开应用时自动使用。

## 🔧 自定义

### 更改默认直播源
默认的 M3U 直播源 URL 在 `App.tsx` 文件的顶部定义：
```typescript
const DEFAULT_M3U_URL = 'https://iptv-org.github.io/iptv/index.m3u';
```
你可以直接修改此常量为你偏好的默认源。

### 通过 UI 更改直播源
应用内置了美观易用的直播源编辑器。用户可以方便地在界面中输入新的 M3U URL 来即时切换和测试不同的频道列表。

## ☁️ 部署

本项目产生的完全是静态文件，因此可以非常容易地部署到任何支持静态文件托管的平台，例如：

*   **GitHub Pages**:
    1.  确保你的代码已提交并推送到 GitHub 仓库。
    2.  在你的 GitHub 仓库页面，进入 "Settings" -> "Pages"。
    3.  在 "Build and deployment" 下的 "Source" 选择 "Deploy from a branch"。
    4.  选择你的主分支 (通常是 `main` 或 `master`) 和 `/(root)` 文件夹作为部署源。
    5.  保存设置。GitHub Actions 会自动开始部署。
    6.  `index.html` 中脚本引用已使用相对路径 (`./index.tsx`)，这有助于在 GitHub Pages 的子目录（如 `https://your-username.github.io/your-repository-name/`）下正确加载资源。
*   **Vercel**: 直接连接你的 GitHub 仓库，Vercel 会自动识别为静态站点并进行部署。
*   **Netlify**: 类似 Vercel，可以轻松从 GitHub 仓库部署。
*   **Cloudflare Pages**: 同样提供了便捷的静态站点托管服务。

## 🤝 贡献

我们非常欢迎对 YouycgTV 项目的任何形式的贡献！如果你有好的建议、发现了 Bug，或者想添加令人激动的新功能，请不要犹豫：

1.  Fork 本仓库。
2.  基于 `main` 分支创建你的特性分支 (`git checkout -b feature/YourAmazingFeature`)。
3.  提交你的代码更改 (`git commit -m 'Add some YourAmazingFeature'`)。
4.  将你的分支推送到 GitHub (`git push origin feature/YourAmazingFeature`)。
5.  在 GitHub 上发起一个 Pull Request，详细说明你的更改。

## 📄 许可证

该项目可采用 [MIT 许可证](LICENSE.txt)。(建议你创建一个 `LICENSE.txt` 文件并将 MIT 许可证的完整文本粘贴进去)。

---

希望这份文档能够帮助你更好地理解和推广 YouycgTV 应用！记得在部署成功后更新文档中的演示链接。
