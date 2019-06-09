export class CoverArt {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.defaultName = 'Music';
    this.artistName = this.defaultName;
    this.gradients = [
      ['#E7DDE0', '#6C84B0'],
      ['#5878A7', '#7DA2D2'],
      ['#AED6CD', '#BCE8C8'],
      ['#DC9655', '#F8B95A']
    ];
    this.currentGradient = 0;
    this.render();
  }

  setArtistName(newName) {
    this.artistName = newName === '' ? this.defaultName : newName;
    this.render();
  }

  setArtistImage(image) {
    this.artistImage = image;
    this.render();
  }

  cycleGradients() {
    this.currentGradient = (this.currentGradient + 1) % this.gradients.length;
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'destination-over';

    if (this.artistImage) {
      const ratio = this.canvas.width / this.artistImage.width;
      const height = this.artistImage.height * ratio;
      this.context.drawImage(this.artistImage, 0, 300, this.canvas.width, height);
    }

    this.context.font = '600 40px "Avenir Next"';
    this.context.fillStyle = '#1A1414'

    this.context.textAlign = "center";
    this.context.fillText("T H I S  I S", this.canvas.width / 2, 160);

    this.context.font = '700 80px "Avenir Next"';
    this.context.fillText(this.artistName, this.canvas.width / 2, 260);

    const gradient = this.context.createLinearGradient(0, 0, 0, 1000);
    gradient.addColorStop(0, this.gradients[this.currentGradient][0]);
    gradient.addColorStop(1, this.gradients[this.currentGradient][1]);

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 400, this.canvas.width, 600);

    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  export() {
    return this.canvas.toDataURL('image/jpeg', 1.0);
  }
}

