# 部署到 GitHub Pages

目标：得到一个公网网址 `https://wangzijie976-ctrl.github.io/`。

站点是纯静态的（无构建、无依赖），GitHub Pages 可以直接托管，**免费，无需备案**。

---

## 关键决定：仓库叫什么名字

你的 GitHub 用户名是 `wangzijie976-ctrl`，所以：

| 仓库名 | 得到的网址 | 说明 |
| --- | --- | --- |
| `wangzijie976-ctrl.github.io` | `https://wangzijie976-ctrl.github.io/` | **推荐**。根域名，最短最好记 |
| `my-homepage`（任意名） | `https://wangzijie976-ctrl.github.io/my-homepage/` | 多一层路径，适合以后放多个站点 |

> ⚠️ 仓库名必须**和用户名完全一致**才能拿到最短网址，包括那个 `-ctrl` 后缀，
> 写成 `wangzijie.github.io` 或 `wangzijie976.github.io` 都拿不到。

---

## 方式 A：网页上传（最快，不用装 git）

1. 打开 <https://github.com/new>，**Repository name** 填 `wangzijie976-ctrl.github.io`，
   可见性选 **Public**（Pages 免费版要求公开仓库），点 **Create repository**。
2. 在新仓库页面点 **uploading an existing file**（或直接访问
   `https://github.com/wangzijie976-ctrl/wangzijie976-ctrl.github.io/upload/main`）。
3. 打开文件夹 `D:\wangzijie\website`，**全选里面的内容**（`index.html`、`assets` 文件夹、
   `README.md`、`DEPLOY.md`、`.gitignore`），拖进浏览器的上传框。
   - 用 `Ctrl+A` 全选时，资源管理器默认不显示 `.nojekyll` 和 `.gitignore` 这类点开头的文件，
     需要先打开「查看 → 显示 → 隐藏的项目」。
     这两个文件可选：`.nojekyll` 只是让 GitHub 跳过 Jekyll 处理，纯粹静态站不加也能正常显示。
4. 下方 **Commit changes** 输入框随便写一句（如 `init personal homepage`），点 **Commit changes**。
5. 点仓库上方的 **Settings → Pages**：
   - **Source** 选 `Deploy from a branch`
   - **Branch** 选 `main`，目录选 `/ (root)`，点 **Save**
6. 等 1–2 分钟，刷新该页面，顶部会出现
   `Your site is live at https://wangzijie976-ctrl.github.io/`。
   **首次部署可能需要 5–10 分钟**，期间访问 404 属正常现象。

---

## 方式 B：命令行（推荐，以后更新只要两行）

前提：已安装 [Git](https://git-scm.com/download/win)。

```powershell
# 1. 进入站点目录
cd D:\wangzijie\website

# 2. 初始化仓库（只需一次）
git init -b main
git add .
git commit -m "init: personal homepage"

# 3. 关联远程仓库
git remote add origin https://github.com/wangzijie976-ctrl/wangzijie976-ctrl.github.io.git

# 4. 推送
git push -u origin main
```

推送时若弹出登录窗口，选择 **Sign in with your browser** 授权即可
（现在 GitHub 不再接受账号密码推送，必须用浏览器授权或 Personal Access Token）。

推送完同样去 **Settings → Pages** 把 Source 设为 `main` / `/ (root)`。

### 以后更新内容

```powershell
cd D:\wangzijie\website
git add .
git commit -m "update: 更新项目经历"
git push
```

大约 1 分钟后线上自动更新，无需再进 Settings 操作。

---

## 方式 C：GitHub Actions 自动部署（可选）

如果你更希望把源码和发布分离（例如以后加构建步骤），可以让 Actions 来发布。
在仓库里新建 `.github/workflows/pages.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

然后在 **Settings → Pages → Source** 选 `GitHub Actions`（而不是 `Deploy from a branch`）。
这种方式首次部署通常比方式 A 更快。

---

## 上线后的检查清单

- [x] 页面可访问（HTTP 200，已验证）
- [x] 区块内容与简历一致（已验证）
- [x] 手机号与学号邮箱不在页面上（已验证）
- [x] `robots.txt` / `sitemap.xml` 可访问（HTTP 200，已验证）
- [x] 改版为学术主页版式（顶部导航条 + 左侧信息栏 + 右侧分节正文），页面不含任何 JavaScript
- [ ] 手机上打开一次（微信里直接点链接），确认没有横向滚动条
- [ ] `Ctrl+P` 打印预览是否是一份干净的单色文档
- [ ] 微信/QQ 里把链接发给自己，确认卡片标题显示正确
- [ ] **填入公开邮箱**（当前仍是橙色占位文字，求职必备）
- [ ] **放入 `assets/resume.pdf`**，或删掉头部那个指向它的链接（否则点开 404）
- [ ] 确认「所在地」是否正确（现按学校填为「湖南 · 长沙」）
- [ ] 确认「求职意向」的实习时间 / 校招届别 / 城市（现填 2027 暑期实习、2030 届）
- [ ] 每次改完页面，更新页脚的「本页最后更新：YYYY-MM-DD」

## 部署现状（已上线）

| 项目 | 值 |
| --- | --- |
| 线上地址 | <https://wangzijie976-ctrl.github.io/> |
| 代码仓库 | <https://github.com/wangzijie976-ctrl/wangzijie976-ctrl.github.io> |
| 发布分支 | `main` / `/ (root)`（Deploy from a branch） |
| 首次部署提交 | `459a0d2` |
| 索引文件提交 | `95b1c10`（新增 `robots.txt`、`sitemap.xml`） |

站点已允许搜索引擎收录（`robots.txt` 为 `Allow: /` 并指向 `sitemap.xml`）。
如果以后想让 HR 之外的人搜不到，把 `robots.txt` 改成 `Disallow: /` 再 push 即可。

### 更新流程（已配置好，无需再初始化）

```powershell
cd D:\wangzijie\website
git add .
git commit -m "update: 修改说明"
git push
```

GitHub Pages 会在 push 后约 1 分钟自动重新构建。
**注意**：构建期间访问新文件可能出现短暂 404，这是正常的，等 1–2 分钟再刷新。

## 联系方式现状

页面为学术主页版式（顶部导航条 + 左侧信息栏 + 右侧分节正文），中英双语，当前内容：

| 位置 | 当前内容 | 备注 |
| --- | --- | --- |
| 顶部导航条 | 关于我 / 教育背景 / 科研项目 / 实习经历 / 竞赛与获奖 / 联系方式 + **English 切换按钮** | 按钮由 `assets/i18n.js` 控制，选择写入 `localStorage` |
| 左侧信息栏 | 姓名、身份、所在地、实验室、研究方向 | 无需改动（推免/保研字样已按要求删除） |
| 左侧信息栏 → GitHub | `github.com/wangzijie976-ctrl` | 力扣链接已按要求移除 |
| 左侧信息栏 → 简历 | 指向 `assets/resume.pdf`（**该文件还没放进来**） | 放入 PDF，或删掉这个链接 |
| 关于我 | 一段自我介绍（身份 + 方向 + 欢迎交流） | 中文/英文各一版 |
| 联系方式 → 邮箱 | `wangzijie976@gmail.com` | 非学号邮箱，可公开 |
| 联系方式 → 微信 / 地址 | 「同号，请邮件联系」、「湖南 · 长沙」 | 如实际不在长沙请改 |
| 教育背景 | 国防科技大学（博士研究生，2026.09—至今）、兰州大学（学士，2022.09—2026.06） | 绩点、排名、CET-6 均已按要求删除 |
| 科研项目 / 实习经历 / 竞赛与获奖 | **空小节，只有标题** | 以后有内容直接往对应 `<section>` 里加 |
| 页脚 | 「本页最后更新 2026-11-17」 | 每次改完页面同步这个日期 |

### 中英双语怎么维护

每处文案写成一对：`<span class="zh">中文</span><span class="en">English</span>`，
`style.css` 按 `<html lang>` 决定显示哪一个；**默认中文**，禁用 JS 时按钮不出现、页面仍是完整中文。
新增内容时两种语言都要写，漏一种就会在对应语言下空白。

### 待补事项

- [ ] **`assets/resume.pdf`**：放入简历 PDF，否则左侧「简历」链接 404
- [ ] **`assets/photo.jpg`**（可选）：放入证件照/生活照后，取消 `index.html` 里 `<img class="avatar">` 那行注释
- [ ] **科研项目 / 实习经历 / 竞赛与获奖**：内容产出后补进对应小节
- [ ] **页脚更新日期**：每次改完页面同步

> **关于 Gitee**：现在的页面**没有** Gitee 链接（Gitee Pages 已停服，且此前那条 `gitee.com/awzj`
> 无法确认是否为你本人账号，已移除）。Gitee 仍可作为代码备份仓库使用，但公网页面只走 GitHub Pages。

**换邮箱**：编辑 `index.html` 的 `#contact` 小节，把 `mailto:` 与显示文字两处一起替换：

```html
<li><span class="k">邮箱</span><a href="mailto:wangzijie976@gmail.com">wangzijie976@gmail.com</a></li>
```

> 提示：公网邮箱会被爬虫抓取，垃圾邮件会变多；介意的话可以像参考站（赖志权老师主页）那样
> 把邮箱做成一张图片，或写成 `wangzijie976 [at] gmail [dot] com` 的形式。

## 为什么不用 Gitee Pages ❌

**Gitee Pages（码云 Pages）已经停止服务，无法再用于部署。** 证据：

- Gitee 帮助中心里 Pages 的文档页面已返回 **404**（`https://help.gitee.com/repository/pages`）；
- Gitee 官方反馈区有用户提交《gitee pages服务不能用了》的 issue（[#I9LOM3](https://gitee.com/oschina/git-osc/issues/I9LOM3)）；
- 国内开发者的记录也显示 Gitee Pages「从整顿页面风险到停服到下线」，
  同类国内服务（Gitcode Pages、CODING Pages）同样已下线
  （[《国内的pages服务都嘎了》](https://anttutu.github.io/post/2026-01-26-pages_died/)）。

**Gitee 仍然可以用来托管代码**（当作 Git 仓库 / 展示项目源码），只是**不能再发布网页**。
所以本站的源码你完全可以同时推到 Gitee 备份，但公网访问要走 GitHub Pages 或 Cloudflare Pages。

## 自定义域名（可选，以后再说）

有域名的话在 `Settings → Pages → Custom domain` 填入域名，然后到域名解析商处添加：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `wangzijie976-ctrl.github.io` |

勾选 **Enforce HTTPS**，等证书签发（通常几分钟到 24 小时）。
