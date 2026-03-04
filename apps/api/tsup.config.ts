import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ["cjs"],
    target: ["node20"],
    platform: "node",
    clean: true,
    bundle: true,
    shims: true,
    splitting: false,
    sourcemap: true,
    noExternal: [/^@repo\//],
});