const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('public/narayani-lockup-official.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const w = this.width;
    const h = this.height;
    const px = this.data;

    // Simple flood fill or threshold for white background
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = px[idx];
        const g = px[idx + 1];
        const b = px[idx + 2];
        // If near white, make transparent
        if (r > 230 && g > 230 && b > 230) {
          px[idx + 3] = 0;
        }
      }
    }

    this.pack().pipe(fs.createWriteStream('public/narayani-lockup-official.png'))
      .on('finish', () => {
        console.log('Logo transparent conversion completed!');
      });
  });
