const rust = import('./wasm-graphics/pkg/wasm_graphics.js');

rust
  .then((m) => {
    m.say_hello_from_rust();
  })
  .catch(console.error);
