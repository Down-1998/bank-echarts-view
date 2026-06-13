# 银行资金地图交易系统

一个基于 `React + TypeScript + Hooks + ECharts + Vite` 搭建的银行资金可视化驾驶舱示例项目。

项目以“银行资金地图交易系统”为主题，模拟全国分支机构之间的资金清算、航线路由、交易预警、风险摘要和台账联动，适合用于可视化演示、前端作品展示或金融大屏原型开发。

## 项目特性

- `React + TypeScript + Hooks` 组织页面与交互逻辑
- `ECharts` 实现柱状图、折线图、饼图、中国地图和模拟航线
- `axios + axios-mock-adapter` 模拟后端接口请求
- 统一 `http` 请求封装与 `api` 接口封装
- 地图悬浮联动、点击分行抽屉详情、交易与预警联动
- 正式中文银行术语文案
- 大屏风格 UI，支持桌面端与移动端响应式适配
- 图表运行时懒加载，减少首屏压力

## 技术栈

- `React 19`
- `TypeScript`
- `Vite 5`
- `ECharts`
- `echarts-for-react`
- `Axios`
- `axios-mock-adapter`

## 启动方式

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

当前项目默认启动地址为：

```bash
http://127.0.0.1:5173
```

### 3. 生产构建

```bash
npm run build
```

### 4. 本地预览构建结果

```bash
npm run preview
```

## 页面模块

### 顶部总览

- 系统名称与业务说明
- 当前业务日期、刷新时间、接口时延、成功率

### 指标卡区

- 当日清算总量
- 日间可调拨资金
- 已处理交易笔数
- 风险拦截率

### 时间轴区

- 模拟日内资金清算作业节点
- 展示当前作业进度状态

### 左侧分析区

- 分行资金净流入排名
- 交易渠道结构分布
- 联动风控摘要

### 地图主视图区

- 中国地图资金流向分布
- 模拟航线与城市热度散点
- 地图悬浮联动
- 点击城市打开分行详情抽屉

### 趋势与预警区

- 小时级清算趋势折线图
- 实时预警滚动播报
- 预警明细列表

### 底部台账区

- 清算交易流水台账
- 联动展示当前焦点城市相关交易

### 分行详情抽屉

- 近 7 日资金趋势
- 风险摘要
- 预警列表
- 关联交易

## 项目目录结构

```text
react-echart/
├─ src/
│  ├─ api/
│  │  └─ dashboard.ts            # 接口调用封装
│  ├─ components/
│  │  ├─ ReactChart.tsx          # 图表组件封装
│  │  ├─ SectionCard.tsx         # 区块卡片组件
│  │  └─ StatCard.tsx            # 指标卡组件
│  ├─ config/
│  │  └─ cityProfiles.ts         # 城市画像配置
│  ├─ hooks/
│  │  ├─ useClock.ts             # 顶部时钟逻辑
│  │  ├─ useDashboardData.ts     # 数据请求与刷新逻辑
│  │  └─ useDashboardDrilldown.ts # 地图联动与钻取逻辑
│  ├─ lib/
│  │  ├─ echarts.ts              # 地图注册
│  │  └─ http.ts                 # 请求封装
│  ├─ mock/
│  │  ├─ dashboard.ts            # mock 接口定义
│  │  └─ payload.ts              # mock 数据与图表配置
│  ├─ types/
│  │  └─ dashboard.ts            # 类型定义
│  ├─ App.tsx                    # 页面主入口
│  ├─ main.tsx                   # 应用挂载入口
│  └─ style.css                  # 全局样式
├─ package.json
└─ README.md
```

## 数据流说明

### 请求链路

页面通过 `useDashboardData` 发起请求：

`useDashboardData -> api/dashboard.ts -> lib/http.ts -> mock/dashboard.ts -> mock/payload.ts`

说明：

- `lib/http.ts` 负责统一封装请求与响应解包
- `api/dashboard.ts` 负责业务接口调用
- `mock/dashboard.ts` 使用 `axios-mock-adapter` 拦截请求
- `mock/payload.ts` 返回模拟后端数据

## 交互说明

### 地图悬浮

- 悬浮城市时，左侧风险摘要、底部台账、预警区会联动显示对应焦点数据

### 地图点击

- 点击城市后打开右侧分行详情抽屉
- 左侧柱状图与饼图切换为当前分行视角
- 抽屉中展示近 7 日趋势、预警、风险和关联交易

## 可继续扩展的方向

- 接入真实后端接口
- 增加更多城市与分行画像配置
- 接入 WebSocket 实时推送预警
- 增加权限控制、筛选器、时间范围切换
- 将样式拆分为模块化样式或 CSS 方案
- 增加单元测试与接口测试

## 当前说明

- 当前数据为本地模拟数据，不依赖真实后端
- 项目已验证 `npm run build` 可通过
- 若开发环境启动后页面未自动打开，请手动访问：

```bash
http://127.0.0.1:5173
```

如果端口被占用，可以修改 `package.json` 中的 `dev` 脚本端口，或直接使用：

```bash
npx vite --host 127.0.0.1 --port 5173
```

