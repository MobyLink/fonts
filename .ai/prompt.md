这是一个用于 MobyLink 的 Web fonts 字体子集化仓库，用于：

- 将 assets 下的字体文件进行子集化处理，生成适用于 Web 的 woff2 字体文件
- 生成对应的 CSS 文件，方便在网页中引用子集化后的字体

assets 下的字体文件包括：

- 品牌
  - Fredoka
    - https://fonts.google.com/specimen/Fredoka
  - 站酷庆科黄油体 zcoolqingkehuangyouti
    - https://www.zcool.com.cn/work/ZMTg5MDEyMDQ
- 标题
  - 京华老宋体 KingHwaOldSong
    - https://zhuanlan.zhihu.com/p/1915922891633043436
- 正文
  - 小赖字体 Xiaolai
    - https://github.com/lxgw/kose-font

子集化工具：

- 使用 npm 包 cn-font-split 实现，文档见 https://github.com/KonghaYao/cn-font-split/tree/release/packages/ffi-js
- 你需要写一个脚本，调用 cn-font-split 提供的 API 来处理字体文件

处理完成后的使用方法：

- <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MobyLink/fonts/build/css/fonts.min.css">
- fonts.min.css 文件中包含了所有子集化后的字体引用
- build/css 文件夹内部还包含了各个字体的单独 css 文件，方便按需引用
- build/fonts 文件夹中包含了所有生成的 woff2 字体文件

你需要将以上功能完整实现，并输出 README.md 文件，说明项目的功能、技术、使用方法，以及字体版权信息。
