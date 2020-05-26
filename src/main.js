// -- 
const manifest = browser.runtime.getManifest();
const options  = manifest.build_settings;

let backends = [];

// --

function messageHandler(msg) {
    console.log(msg);
}

// --

console.log("Hello from JumpADS!");


options.enabled_backends.forEach((backend_c) => {
    try {
	let backend_url = browser.runtime.getURL(`src/backends/${backend_c}.js`)
	import(backend_url)
	    .then((module) => backends.push(module.meta));
    } catch(err) {
	console.error(`Error on loading backend from candidate ${backend_c}:`);
	console.error(err);
	console.error("Backend will not be available");
    }
});

browser.runtime.onMessage.addListener(messageHandler);
