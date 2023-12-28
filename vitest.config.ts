import { defineConfig } from 'vitest/dist/config'

export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist', 'src/command-test/mock.test.ts']
  }
})
