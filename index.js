const rust = import('./wasm-graphics/pkg/wasm_graphics.js');
const canvas = document.getElementById('rustCanvas');

const gl = canvas.getContext('webgl', { antialias: true });

rust
  .then((m) => {
    if (!gl) {
      alert('Failed to initialize webGL');
    }

    const FPS_THROTTLE = 1000.0 / 30.0; // milliseconds / frames
    let lastFrameTime = -1; // In milliseconds
    const dougClient = new m.DougClient();
    const initialTime = Date.now();

    function render() {
      window.requestAnimationFrame(render);
      const currentTime = Date.now();
      if (currentTime >= lastFrameTime + FPS_THROTTLE) {
        lastFrameTime = currentTime;

        if (
          window.innerHeight !== canvas.height ||
          window.innerWidth !== canvas.width
        ) {
          canvas.height = window.innerHeight;
          canvas.clientHeight = window.innerHeight;
          canvas.style.height = window.innerHeight;

          canvas.width = window.innerWidth;
          canvas.clientWidth = window.innerWidth;
          canvas.style.width = window.innerWidth;

          gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        }

        let elapsedTime = currentTime - initialTime;

        // Rust update call
        dougClient.update(elapsedTime, window.innerHeight, window.innerWidth);
        // Rust Render call
        dougClient.render();
      }
    }

    render();
  })
  .catch((err) => console.error(err.message));
