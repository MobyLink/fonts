# MobyLink Web Fonts

这是一个用于 MobyLink 的 Web fonts 字体子集化仓库。我们将原始字体文件进行子集化处理，生成适用于 Web 的轻量级 `woff2` 字体文件，并提供自动生成的 CSS 引用。

## 功能

- **字体子集化**：使用 `cn-font-split` 将字体文件按需切分，大幅减小加载体积。
- **格式转换**：输出 Web 友好的 `woff2` 格式。
- **自动 CSS**：生成包含所有字体引用的 `fonts.min.css` 以及单字体的 CSS 文件。

## 使用方法

### CDN 引用 (推荐)

在你的 HTML `<head>` 中引入以下 CSS 文件即可使用所有字体：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MobyLink/fonts/build/css/fonts.min.css">
```

或者，如果你只需要某个特定的字体，可以单独引用（将 `{FontName}` 替换为下方列表中的字体名）：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MobyLink/fonts/build/css/{FontName}.css">
```

### 字体列表 (Font Family)

| 字体名 (CSS Font Family) | 用途 | 原始字体 |
| ------------------------ | ---- | -------- |
| `Fredoka` | 品牌（西文与数字）、手写体（西文） | [Fredoka](https://fonts.google.com/specimen/Fredoka) |
| `ZCOOLQingKeHuangYou` | 品牌（中文） | [站酷庆科黄油体](https://www.zcool.com.cn/work/ZMTg5MDEyMDQ)（1.0 版本，下载自 [Google Fonts](https://fonts.google.com/specimen/ZCOOL+QingKe+HuangYou)）  |
| `KingHwaOldSong` | 宋体（需要宋体显示的地方，只有 400，不加粗） | [京华老宋体](https://zhuanlan.zhihu.com/p/1915922891633043436) |
| `Xiaolai` | 手写体（中文，只有 400，不加粗） | [小赖字体](https://github.com/lxgw/kose-font) |

### CSS 示例

字体族的命名与组合和设计系统（`MobyLink/design` 的 `system/tokens/typography.json`）保持一致：

```css
:root {
  --font-brand: Fredoka, ZCOOLQingKeHuangYou, sans-serif;
  --font-heading: KingHwaOldSong, serif;
  --font-cursive: Fredoka, Xiaolai, cursive;
  --font-mono: monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
}
```

- `brand`：品牌字体，用于字标等品牌场景。
- `heading`：宋体，用于需要宋体显示的地方，不限定具体场景。
- `cursive`：手写体，用于适合手写感的地方，不限定具体场景。
- `mono`、`sans`：系统字体，本仓库不提供字体文件。

## 开发与构建

本项目使用 Node.js 进行构建。

### 1. 安装依赖

```bash
npm install
```

### 2. 构建字体

运行构建脚本，处理 `assets` 目录下的字体文件，并将结果输出到 `build` 目录。

```bash
node scripts/build.mjs
```

构建产物结构：
- `build/fonts/{FontName}/`: 包含切分后的 woff2 字体文件。
- `build/css/`: 包含 CSS 引用文件。

## 技术栈

- [cn-font-split](https://github.com/KonghaYao/cn-font-split): 字体子集化工具，支持 woff2 格式输出。

## 版权说明

本仓库仅提供字体子集化处理，字体版权归原作者所有。

- **Fredoka**: SIL Open Font License 1.1
- **站酷庆科黄油体**: SIL Open Font License 1.1
- **京华老宋体**: 免费商用 (KingHwaOldSong)
- **小赖字体**: SIL Open Font License 1.1

请在使用前仔细核对各字体的授权许可。
