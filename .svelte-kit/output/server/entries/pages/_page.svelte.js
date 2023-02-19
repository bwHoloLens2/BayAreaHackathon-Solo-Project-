import { c as create_ssr_component } from "../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ":root{--accent:124, 58, 237;--accent-gradient:linear-gradient(45deg, rgb(var(--accent)), #da62c4 30%, white 60%)}code.svelte-1jt3g0m{font-family:Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,\n			Bitstream Vera Sans Mono, Courier New, monospace;font-size:0.875em;font-weight:bold;background:rgba(var(--accent),12%);color:rgb(var(--accent));border-radius:4px;padding:0.3em 0.45em}h1.svelte-1jt3g0m{font-size:3rem;font-weight:800;margin:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"navbar bg-base-400"}"><div class="${"navbar-start"}"></div>
    <div class="${"navbar-center"}"><a class="${"normal-case text-xl text-pop-up-bottom"}">AI Notes ( Hackathon ) </a></div>
    <div class="${"navbar-end"}"><button class="${"btn btn-primary"}">Get Started </button></div></div>

  <div class="${"hero min-h-screen bg-base-200"}"><div class="${"hero-content text-center"}"><div class="${"max-w-md"}"><h1 class="${"text-5xl font-bold svelte-1jt3g0m"}">AI Note App</h1>
        <p class="${"py-6"}">AI note taking app to <code class="${"svelte-1jt3g0m"}">ASSIST</code> you not <code class="${"svelte-1jt3g0m"}">REPLACE</code> you. Unlike other apps we focus on <code class="${"svelte-1jt3g0m"}">INTEGRATING</code> with your workflow to <code class="${"svelte-1jt3g0m"}">BOOST</code> your productivity.</p>
        <button class="${"btn btn-primary"}">Get Started</button></div></div></div>

  <footer class="${"footer bg-neutral text-white"}"><div><span class="${"footer-title"}">Eduard Faus (Developer)</span>
        <span class="${"footer-subtitle"}">© 2023</span></div>
  </footer>`;
});
export {
  Page as default
};
