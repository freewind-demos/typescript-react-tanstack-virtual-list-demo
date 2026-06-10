// 引入 React 类型与 hooks。
import { type FC, useMemo, useState } from 'react'
// 引入虚拟项摘要格式化工具。
import { formatVirtualStats } from './formatVirtualStats'
// 引入 TanStack headless 列表组件。
import { TanstackVirtualList } from './TanstackVirtualList'

// 演示数据总量。
const TOTAL_COUNT = 10_000
// 列表视口高度。
const VIEWPORT_HEIGHT = 440
// 默认行高。
const DEFAULT_ITEM_HEIGHT = 44
// 默认 overscan。
const DEFAULT_OVERSCAN = 4

// 根据索引生成行文案。
const buildRowLabel = (index: number) =>
  `第 ${index + 1} 行 · TanStack 只提供 virtualItems，DOM 自己拼`

// 行样式。
const rowStyle = (index: number, itemHeight: number) => ({
  display: 'flex',
  alignItems: 'center',
  height: itemHeight,
  padding: '0 1rem',
  borderBottom: '1px solid var(--pico-muted-border-color)',
  background: index % 2 === 0 ? 'var(--pico-card-background-color)' : 'transparent',
  boxSizing: 'border-box' as const,
})

// 页面主组件：展示 @tanstack/react-virtual 的 headless 用法。
export const App: FC = () => {
  // 行高调节。
  const [itemHeight, setItemHeight] = useState(DEFAULT_ITEM_HEIGHT)
  // overscan 调节。
  const [overscan, setOverscan] = useState(DEFAULT_OVERSCAN)
  // 当前 virtualItems 原始数据。
  const [virtualItems, setVirtualItems] = useState<Array<{ index: number }>>([])

  // 把 virtualItems 转成页面可读统计。
  const stats = useMemo(() => formatVirtualStats(virtualItems), [virtualItems])

  return (
    <main className="container">
      <h1>@tanstack/react-virtual 虚拟列表</h1>
      <p>
        TanStack 是 <strong>headless</strong> 方案：<code>useVirtualizer</code> 只负责算出
        <code>virtualItems</code> 和 <code>totalSize</code>，滚动容器、绝对定位、行内容都由你自己写。
      </p>

      <article>
        <header>控制面板</header>
        <label>
          行高（px）
          <input
            type="range"
            min={32}
            max={72}
            step={4}
            value={itemHeight}
            onChange={(event) => setItemHeight(Number(event.target.value))}
          />
          {itemHeight}
        </label>

        <label>
          overscan
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={overscan}
            onChange={(event) => setOverscan(Number(event.target.value))}
          />
          {overscan}
        </label>

        <p>
          数据总量：<strong>{TOTAL_COUNT.toLocaleString()}</strong>
          {' · '}
          当前挂载 virtualItems：<strong>{stats.mountedCount}</strong>
          {' · '}
          索引区间：
          <strong>
            {stats.firstIndex} ~ {stats.lastIndex}
          </strong>
        </p>
      </article>

      <TanstackVirtualList
        totalCount={TOTAL_COUNT}
        itemHeight={itemHeight}
        height={VIEWPORT_HEIGHT}
        overscan={overscan}
        onVirtualItemsChange={setVirtualItems}
        renderItem={(index) => (
          <div style={rowStyle(index, itemHeight)}>{buildRowLabel(index)}</div>
        )}
      />
    </main>
  )
}
