/*
 * Stripe-style animated gradient background
 * Attempt to use WebGL, falls back to Canvas 2D
 */
(function () {
  "use strict";

  // Mini color utility
  function normalizeColor(hexStr) {
    let hex = hexStr.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const num = parseInt(hex, 16);
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }

  class MiniGl {
    constructor(canvas, width, height) {
      this.canvas = canvas;
      this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!this.gl) return;
      this.meshes = [];
      const gl = this.gl;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      this.setSize(width, height);
    }
    setSize(w, h) {
      this.width = w; this.height = h;
      this.canvas.width = w; this.canvas.height = h;
      if (this.gl) this.gl.viewport(0, 0, w, h);
    }
    render() {
      if (!this.gl) return;
      const gl = this.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }

  class Gradient {
    constructor() {
      this.el = null;
      this.cssVarRetries = 0;
      this.maxRetries = 200;
      this.angle = 0;
      this.colorStops = [];
      this.isRunning = false;
      this.t = 0;
    }

    initGradient(selector) {
      this.el = document.querySelector(selector);
      if (!this.el) return;

      this.connect();
    }

    connect() {
      this.shaderFiles = { vertex: "", noise: "", blend: "", fragment: "" };
      this.conf = { density: [0.06, 0.16], amp: 320, seed: 5, speed: 3 };

      this.colorStops = this.getColors();
      if (this.colorStops.length < 2) {
        if (this.cssVarRetries < this.maxRetries) {
          this.cssVarRetries++;
          requestAnimationFrame(() => this.connect());
          return;
        }
        // Fallback colors
        this.colorStops = [
          normalizeColor("#6c00ca"),
          normalizeColor("#3e00de"),
          normalizeColor("#386df0"),
          normalizeColor("#88e2d2"),
        ];
      }

      this.initCanvas2D();
    }

    getColors() {
      const colors = [];
      for (let i = 0; i < 4; i++) {
        const varName = `--gradient-color-${i}`;
        const val = getComputedStyle(this.el).getPropertyValue(varName).trim();
        if (val) colors.push(normalizeColor(val));
      }
      return colors;
    }

    initCanvas2D() {
      const canvas = this.el;
      this.ctx = canvas.getContext("2d");
      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.isRunning = true;
      this.animate();
    }

    resize() {
      const parent = this.el.parentElement;
      if (parent) {
        this.el.width = parent.offsetWidth;
        this.el.height = parent.offsetHeight;
      }
    }

    animate() {
      if (!this.isRunning) return;
      this.t += 0.002;
      this.renderGradient();
      requestAnimationFrame(() => this.animate());
    }

    renderGradient() {
      const ctx = this.ctx;
      const w = this.el.width;
      const h = this.el.height;
      if (!w || !h) return;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Animated blobs
      const cols = this.colorStops;
      const blobs = [
        { cx: 0.2 + 0.15 * Math.sin(this.t * 0.7), cy: 0.3 + 0.1 * Math.cos(this.t * 0.5), r: 0.55 },
        { cx: 0.75 + 0.1 * Math.cos(this.t * 0.6), cy: 0.25 + 0.15 * Math.sin(this.t * 0.8), r: 0.5 },
        { cx: 0.7 + 0.12 * Math.sin(this.t * 0.9 + 1), cy: 0.75 + 0.1 * Math.cos(this.t * 0.4), r: 0.55 },
        { cx: 0.25 + 0.1 * Math.cos(this.t * 0.5 + 2), cy: 0.8 + 0.1 * Math.sin(this.t * 0.7), r: 0.5 },
      ];

      // Base dark fill
      ctx.fillStyle = "#050a19";
      ctx.fillRect(0, 0, w, h);

      // Draw each blob
      blobs.forEach((blob, i) => {
        const col = cols[i] || cols[0];
        const x = blob.cx * w;
        const y = blob.cy * h;
        const radius = blob.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(${Math.round(col[0]*255)}, ${Math.round(col[1]*255)}, ${Math.round(col[2]*255)}, 0.85)`);
        grad.addColorStop(0.5, `rgba(${Math.round(col[0]*255)}, ${Math.round(col[1]*255)}, ${Math.round(col[2]*255)}, 0.3)`);
        grad.addColorStop(1, `rgba(${Math.round(col[0]*255)}, ${Math.round(col[1]*255)}, ${Math.round(col[2]*255)}, 0)`);

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // Reset composite
      ctx.globalCompositeOperation = "source-over";

      // Darken top
      if (this.el.dataset.jsDarkenTop !== undefined) {
        const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.35);
        topGrad.addColorStop(0, "rgba(5,10,25,0.5)");
        topGrad.addColorStop(1, "rgba(5,10,25,0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, w, h * 0.35);
      }
    }

    disconnect() {
      this.isRunning = false;
    }
  }

  window.Gradient = Gradient;
})();
