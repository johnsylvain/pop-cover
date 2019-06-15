export class CoverArtRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.defaultName = 'Music';
    this.artistName = this.defaultName;
    this.gradient = ['#E7DDE0', '#6C84B0'];

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.width * dpr;
    this.canvas.height = this.canvas.height * dpr;

    this.render();
  }

  update(newParams) {
    const { name, image, backdrop } = newParams;
    this.artistName =
      typeof name === 'undefined' ? this.artistName : name.trim();
    this.artistImage = image || this.artistImage;
    this.gradient = backdrop || this.gradient;

    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'destination-over';

    if (this.artistImage && this.artistImage.type === 'image/png') {
      const ratio = this.canvas.width / this.artistImage.width;
      const height = this.artistImage.height * ratio;
      this.context.drawImage(
        this.artistImage,
        0,
        this.canvas.height * 0.3,
        this.canvas.width,
        height
      );
    }

    this.context.font = `600 ${this.canvas.height *
      0.04}px "Avenir Next", "Avenir", "Roboto", "Ubuntu", "Helvetica Neue"`;
    this.context.fillStyle = '#1A1414';

    this.context.textAlign = 'center';
    this.context.fillText(
      'T H I S  I S',
      this.canvas.width / 2,
      this.canvas.height * 0.16
    );

    this.context.font = `700 ${this.canvas.height * 0.08}px "Avenir Next"`;
    this.context.fillText(
      this.artistName || this.defaultName,
      this.canvas.width / 2,
      this.canvas.height * 0.26
    );

    const gradient = this.context.createLinearGradient(
      this.canvas.width * 0.25,
      0,
      this.canvas.width * 0.6,
      this.canvas.height
    );
    gradient.addColorStop(0.3, this.gradient[0]);
    gradient.addColorStop(1, this.gradient[1]);

    if (this.artistImage && this.artistImage.type === 'image/jpeg') {
      this.context.globalAlpha = 0.3;
    }

    this.context.fillStyle = gradient;
    this.context.fillRect(
      0,
      this.canvas.height * 0.4,
      this.canvas.width,
      this.canvas.height * 0.6
    );

    this.context.globalAlpha = 1;

    if (this.artistImage && this.artistImage.type === 'image/jpeg') {
      const ratio = this.canvas.width / this.artistImage.width;
      const height = this.artistImage.height * ratio;
      this.context.drawImage(
        this.artistImage,
        0,
        this.canvas.height * 0.4,
        this.canvas.width,
        height
      );
    }

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  export(quality = 1.0) {
    return this.canvas.toDataURL('image/jpeg', quality);
  }
}
