/// <reference types="vite/client" />

declare const __APP_VERSION__: string

declare module '*.glsl' {
  const src: string
  export default src
}

declare module '*.vert' {
  const src: string
  export default src
}

declare module '*.frag' {
  const src: string
  export default src
}
