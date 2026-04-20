/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DeficeComponent<{}, {}, any>
  export default component
}
