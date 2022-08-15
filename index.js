const rust = import('./wasm-graphics/pkg/wasm_graphics.js');

rust
  .then((m) => {
    m.say_hello_from_rust();
  })
  .catch((err) => console.error(err.message));
