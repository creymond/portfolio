/**
 * Cyberpunk Starfield
 * 2000 animated stars with depth, twinkle, and color tints
 */
(function () {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var stars = [];
  var W, H;
  var STAR_COUNT = 2000;
  var SPEED = 0.2;
  var t = 0;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
  }

  function initStars() {
    stars = [];
    for (var i = 0; i < STAR_COUNT; i++) {
      var layer = Math.random();
      stars.push({
        x: Math.random() * 3000 - 1000,
        y: Math.random() * 1800 - 400,
        z: Math.random() * 1000 + 1,
        sz: layer < 0.65
          ? Math.random() * 0.6 + 0.15
          : layer < 0.9
            ? Math.random() * 1.0 + 0.5
            : Math.random() * 1.6 + 0.9,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpd: Math.random() * 0.03 + 0.008,
        // ~6% gold stars, ~6% cyan stars, rest white
        hue: Math.random() < 0.06 ? 1
           : Math.random() < 0.12 ? 2
           : 0
      });
    }
  }

  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    var cx = W / 2;
    var cy = H / 2;
    t++;

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];

      // Move star toward camera
      s.z -= SPEED;
      if (s.z <= 0) {
        s.z = 1000;
        s.x = Math.random() * 3000 - 1000;
        s.y = Math.random() * 1800 - 400;
      }

      // Project to 2D
      var sx = ((s.x - cx) / (s.z * 0.5)) * 200 + cx;
      var sy = ((s.y - cy) / (s.z * 0.5)) * 200 + cy;

      // Skip off-screen
      if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;

      // Depth and twinkle
      var depth = 1 - s.z / 1000;
      var r = Math.max(0.08, depth * s.sz * 1.6);
      var tw = 0.55 + 0.45 * Math.sin(s.twinkle + t * s.twinkleSpd);
      var a = Math.max(0.02, depth * 0.9 * tw);

      // Color based on hue type
      var col;
      if (s.hue === 1) col = '196,160,0';       // gold
      else if (s.hue === 2) col = '37,225,237';  // cyan
      else col = '210,215,225';                   // white

      // Draw star
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + col + ',' + a + ')';
      ctx.fill();

      // Cross streaks on close bright stars
      if (s.z < 120 && r > 1.0) {
        var tl = r * 5;
        ctx.strokeStyle = 'rgba(' + col + ',' + (a * 0.12) + ')';
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(sx - tl, sy);
        ctx.lineTo(sx + tl, sy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sx, sy - tl * 0.5);
        ctx.lineTo(sx, sy + tl * 0.5);
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  // Initialize
  resize();
  initStars();
  draw();

  // Handle window resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
})();
