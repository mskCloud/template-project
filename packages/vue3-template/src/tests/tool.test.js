import { expect, test } from 'vitest'
import { testTool } from '@/common/tool'

test('testTool 1 + 2 to equal 3', () => {
    expect(testTool(1, 2)).toBe(3)
})
