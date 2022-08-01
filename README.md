# 如何使用
### 下载项目
`git clone https://github.com/ChengTouYuan/drag-chart.git`
### 安装依赖
`npm install`
`yarn install`
### 启动项目
`npm run dev`

# 介绍
点击组件栏即可新增组件;组件在画布中可拖动;缩放调整大小;右键删除组件;右侧可配置组件内容。
项目开发使用技术`js + scss + vue3 + Ant`
### 开发新的组件
`npm run c 文件名（不加后缀）`
在`/charts`文件夹下生成模板，也可以自己创建文件，参考其他组件即可
建议使用模板创建，很多固定方法需要创建，模板一键生成，方便使用，减少出错

#### 配置生成组件
`/config`目录下有两个配置文件，按照格式配置进去即可。页面将根据配置文件生成可选择的图表。

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
