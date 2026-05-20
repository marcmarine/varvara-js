import { readFileSync, writeFileSync } from "fs";
import postcss from "postcss";
import postcssJs from "postcss-js";

const files = ["variables", "components"];

for (const name of files) {
	const css = readFileSync(`./dist/${name}.css`, "utf8");
	const root = postcss.parse(css);
	const js = postcssJs.objectify(root);

	writeFileSync(`./dist/${name}.js`, `export default ${JSON.stringify(js)}\n`);

	console.log(`Generated: ${name}.js`);
}
