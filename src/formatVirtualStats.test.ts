// 引入 Vitest 断言与测试函数。
import { expect, test } from 'vitest'
// 引入待测纯函数。
import { formatVirtualStats } from './formatVirtualStats'

// 验证空虚拟项列表的摘要。
test('returns empty stats for no virtual items', () => {
  expect(formatVirtualStats([])).toMatchInlineSnapshot(`
    {
      "firstIndex": 0,
      "lastIndex": -1,
      "mountedCount": 0,
    }
  `)
})

// 验证正常虚拟项区间的摘要。
test('returns stats for virtual items', () => {
  expect(
    formatVirtualStats([
      { index: 10 },
      { index: 11 },
      { index: 12 },
    ]),
  ).toMatchInlineSnapshot(`
    {
      "firstIndex": 10,
      "lastIndex": 12,
      "mountedCount": 3,
    }
  `)
})
