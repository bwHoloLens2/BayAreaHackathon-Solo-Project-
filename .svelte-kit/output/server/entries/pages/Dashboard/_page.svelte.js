import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import "../../../chunks/fb.js";
import "firebase/firestore";
import { S as Status } from "../../../chunks/Status.js";
import "firebase/auth";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".box.svelte-z2g42p{background-color:#fff;border-radius:6px;box-shadow:0 .5em 1em -.125em hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.02);color:#4a4a4a;display:block;padding:1.25rem\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<html data-theme="${"pastel"}">${`${validate_component(Status, "Status").$$render($$result, {}, {}, {})}`}
</html>`;
});
export {
  Page as default
};
