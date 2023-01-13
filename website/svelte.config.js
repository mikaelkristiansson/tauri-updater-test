import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  preprocess: [preprocess()],

  kit: {
    paths: {
      base: '/tauri-updater-test',
    },
    adapter: adapter(),
  },
}

export default config
