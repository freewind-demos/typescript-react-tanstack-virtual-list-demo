// 引入 TanStack Virtual 的核心 hook。
import { useVirtualizer } from '@tanstack/react-virtual'
// 引入 React 类型与 hooks。
import { type FC, type ReactNode, useEffect, useRef } from 'react'

// headless 虚拟列表组件 props。
export type TanstackVirtualListProps = {
  // 数据总条数。
  totalCount: number
  // 预估行高，TanStack 用它做初始布局。
  itemHeight: number
  // 滚动容器高度。
  height: number
  // 视口上下额外渲染行数。
  overscan: number
  // 根据索引渲染一行。
  renderItem: (index: number) => ReactNode
  // 虚拟项变化时回调，供页面展示统计信息。
  onVirtualItemsChange?: (virtualItems: Array<{ index: number }>) => void
}

// 用 @tanstack/react-virtual 计算虚拟项，DOM 结构由本组件组装。
export const TanstackVirtualList: FC<TanstackVirtualListProps> = ({
  totalCount,
  itemHeight,
  height,
  overscan,
  renderItem,
  onVirtualItemsChange,
}) => {
  // 滚动容器 ref，供 virtualizer 读取 scrollTop。
  const parentRef = useRef<HTMLDivElement>(null)

  // TanStack 虚拟化引擎：只返回应挂载的 virtualItems。
  const rowVirtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  })

  // 当前应渲染的虚拟行集合。
  const virtualItems = rowVirtualizer.getVirtualItems()
  // 全列表总高度，用于撑起滚动条。
  const totalSize = rowVirtualizer.getTotalSize()

  // 把最新 virtualItems 通知外层。
  useEffect(() => {
    onVirtualItemsChange?.(virtualItems)
  }, [onVirtualItemsChange, virtualItems])

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflow: 'auto',
        border: '1px solid var(--pico-muted-border-color)',
        borderRadius: 'var(--pico-border-radius)',
      }}
    >
      <div
        style={{
          height: totalSize,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: itemHeight,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderItem(virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  )
}
