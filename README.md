# @tanstack/react-virtual 虚拟列表 Demo

## 简介

演示 TanStack Virtual 的 **headless** 用法：`useVirtualizer` 只返回 `virtualItems` 与 `totalSize`，滚动容器和行节点由你自己组装。

## 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 运行

```bash
cd typescript-react-tanstack-virtual-list-demo
pnpm install
pnpm run dev
```

### 测试

```bash
pnpm test
```

## 注意事项

- 本 demo 使用固定 `estimateSize`；真实变高场景可配合 `measureElement` 动态测量。
- TanStack 不渲染任何 UI，样式完全由你控制。

## 教程

### 1. 为什么选 TanStack Virtual

它几乎零 UI 观点，适合已有设计系统、需要完全控制 DOM 结构，或与 TanStack Table 等库组合。

### 2. demo 原理

1. `useVirtualizer` 绑定滚动容器 `getScrollElement`。
2. `getVirtualItems()` 返回当前应挂载的行（含 `index`、`start`、`size`、`key`）。
3. 外层占位 `height: getTotalSize()` 维持滚动条。
4. 每行 `position: absolute` + `translateY(start)` 放到正确位置。

### 3. 关键代码

```tsx
const rowVirtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 44,
  overscan: 4,
})

rowVirtualizer.getVirtualItems().map((virtualRow) => (
  <div style={{ transform: `translateY(${virtualRow.start}px)` }}>
    ...
  </div>
))
```

## 操作

1. 快速滚动，观察 `virtualItems` 数量始终很少。
2. 调节 `overscan`，看缓冲行数如何变化。
3. 对比同仓库里的手写 demo 与 react-virtuoso demo，理解三种接入层级的差异。
