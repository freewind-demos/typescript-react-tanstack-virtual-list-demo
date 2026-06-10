// 引入 React server 渲染，测试环境不需要真实浏览器。
import { renderToStaticMarkup } from 'react-dom/server'
// 引入 Vitest 断言与测试函数。
import { expect, test } from 'vitest'
// 引入待测页面。
import { App } from './App'

// 验证页面骨架能正常渲染。
test('renders tanstack virtual demo shell', () => {
  expect(renderToStaticMarkup(<App />)).toMatchInlineSnapshot(`"<main class="container"><h1>@tanstack/react-virtual 虚拟列表</h1><p>TanStack 是 <strong>headless</strong> 方案：<code>useVirtualizer</code> 只负责算出<code>virtualItems</code> 和 <code>totalSize</code>，滚动容器、绝对定位、行内容都由你自己写。</p><article><header>控制面板</header><label>行高（px）<input type="range" min="32" max="72" step="4" value="44"/>44</label><label>overscan<input type="range" min="0" max="12" step="1" value="4"/>4</label><p>数据总量：<strong>10,000</strong> · 当前挂载 virtualItems：<strong>0</strong> · 索引区间：<strong>0 ~ -1</strong></p></article><div style="height:440px;overflow:auto;border:1px solid var(--pico-muted-border-color);border-radius:var(--pico-border-radius)"><div style="height:440000px;width:100%;position:relative"></div></div></main>"`)
})
