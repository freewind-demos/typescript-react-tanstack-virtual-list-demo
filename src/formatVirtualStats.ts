// TanStack Virtual 单次计算出的虚拟项摘要。
export type VirtualItemSummary = {
  // 当前挂载的虚拟项数量。
  mountedCount: number
  // 第一个可见索引。
  firstIndex: number
  // 最后一个可见索引。
  lastIndex: number
}

// 根据 TanStack 返回的 virtualItems 生成展示用摘要。
export const formatVirtualStats = (
  virtualItems: Array<{ index: number }>,
): VirtualItemSummary => {
  // 没有虚拟项时返回空区间。
  if (virtualItems.length === 0) {
    return {
      mountedCount: 0,
      firstIndex: 0,
      lastIndex: -1,
    }
  }

  // 取首尾索引并统计数量。
  const firstIndex = virtualItems[0]?.index ?? 0
  const lastIndex = virtualItems[virtualItems.length - 1]?.index ?? -1

  return {
    mountedCount: virtualItems.length,
    firstIndex,
    lastIndex,
  }
}
