declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.PNG" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.mp4" {
  const content: string;
  export default content;
}

declare module "*.webm" {
  const content: string;
  export default content;
}

declare module "*.ogg" {
  const content: string;
  export default content;
}

declare module "*.mov" {
  const content: string;
  export default content;
}

declare module "*.avi" {
  const content: string;
  export default content;
}

declare module "*.avif" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

// webpack's `require.context`, used to load the private story content only if
// it is present (see data/private-content.ts). @types/webpack-env is not a
// dependency of this project.
interface RequireContext {
  keys: () => string[];
  (id: string): any;
}

declare namespace NodeJS {
  interface Require {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp,
      mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once",
    ) => RequireContext;
  }
}
