# 王子杰 · 个人主页

根据简历（`D:\spaa\test.tex`，moderncv 模板）整理而成的纯静态个人主页。
**零依赖**：不需要 Node、不需要联网，双击 `index.html` 即可打开。

## 文件结构

```
website/
├── index.html          # 页面内容（单页，锚点导航）
├── assets/
│   ├── style.css       # 全部样式：浅色/深色主题、响应式、打印样式
│   └── script.js       # 交互：主题切换、移动端菜单、滚动显现、打字机、导航高亮
├── .nojekyll           # 让 GitHub Pages 跳过 Jekyll 处理（纯静态站用）
├── .gitignore          # Git 忽略规则
├── DEPLOY.md           # ⭐ 部署到 GitHub Pages 的完整步骤
└── README.md
```

## 发布到公网

见 **[DEPLOY.md](DEPLOY.md)**：目标网址 `https://wangzijie976-ctrl.github.io/`，三种方式（网页上传 / 命令行 / GitHub Actions）任选其一。
上线前请先阅读该文档里的**联系方式现状（已脱敏）**一节——手机号与学校邮箱已删除，
留了一处邮箱占位待你填写。

**注意**：Gitee Pages 已经停服，不能用来发布网页（详见 DEPLOY.md）；Gitee 只能当代码仓库用。

## 本地预览

- **最简单**：直接双击 `index.html`。
- **本地服务**（可选，便于手机同局域网访问）：

  ```powershell
  cd D:\spaa\website
  python -m http.server 8080
  # 浏览器访问 http://127.0.0.1:8080
  ```

## 页面结构

| 区块 | 锚点 | 内容来源 |
| --- | --- | --- |
| 首屏 | `#top` | 姓名、学校专业、关键词轮播、绩点/排名/CET-6 |
| 关于我 | `#about` | 自我评价 5 条，提炼为 4 张能力卡 |
| 教育背景 | `#education` | 兰州大学 · 计算机科学与技术基地班 |
| 专业技能 | `#skills` | 6 个技能方向（编程语言 / Web 后端 / AI 生成模型 / 底层并行 / 开发工具 / 算法竞赛） |
| 项目经验 | `#projects` | 健康数据平台、调研资源管理库、SDXL 智能配图系统 |
| 竞赛荣誉 | `#awards` | 7 项获奖（含 2 项省级一等奖） |
| 联系我 | `#contact` | 邮箱、电话、Gitee、所在地 |

## 已实现的特性

- 响应式布局：桌面 / 平板 / 手机三档断点，移动端为抽屉式导航
- 深色模式：右上角一键切换，首次访问跟随系统，选择写入 `localStorage`
- 滚动动效：区块进入视口渐显，技能条按比例展开
- 导航高亮：滚动时自动高亮当前区块
- 无障碍：跳转链接、`aria` 属性、可见焦点环
- 尊重 `prefers-reduced-motion`：系统开启「减少动态效果」时自动关掉动画
- 打印样式：`Ctrl+P` 可直接输出为简洁的浅色文档

## 后续可自行修改的地方

1. **头像**：`index.html` 中 `.avatar` 目前是 `WZJ` 文字占位。把 `<span>WZJ</span>` 换成
   `<img src="assets/avatar.jpg" alt="王子杰" />`，并在 `style.css` 的 `.avatar` 里加
   `overflow: hidden;` 与 `img { width: 100%; height: 100%; object-fit: cover; }` 即可。
2. **技能条进度**：`style.css` 中搜索 `--w:`，按需调整百分比（纯展示用）。
3. **项目链接**：若项目已开源，可在对应 `<article class="project">` 内加一个
   `<a class="btn btn--ghost" href="...">查看仓库</a>`。
4. **更新内容**：直接编辑 `index.html` 里的文字即可，无需重新构建。
5. **联系方式**：手机号与学校邮箱已按脱敏要求删除，页面里搜索 `TODO` 可定位到
   邮箱占位与 Gitee 地址两处待确认项。

> 提示：不要把自己或家人的学号邮箱、手机号直接放上公网页面，会被爬虫抓取。
