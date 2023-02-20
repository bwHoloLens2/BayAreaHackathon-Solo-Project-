import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index.js";
import "../../../../chunks/fb.js";
import { S as Status } from "../../../../chunks/Status.js";
import "firebase/firestore";
import "firebase/auth";
import "openai";
import "quill";
const Editr_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${`${validate_component(Status, "Status").$$render($$result, {}, {}, {})}`}

    
  `;
});
export {
  Page as default
};
