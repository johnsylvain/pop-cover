const canvas = document.querySelector('#cover-art');
canvas.width = 1000;
canvas.height = 1000;

class CoverArt {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.defaultName = 'Spotify';
    this.artistName = this.defaultName; 
    this.render();
  }

  setArtistName(newName) {
    this.artistName = newName === '' ? this.defaultName : newName;
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.globalCompositeOperation = 'destination-over'

    this.context.font = '600 40px "Avenir Next"';
    this.context.fillStyle = '#1A1414'

    this.context.textAlign = "center"; 
    this.context.fillText("T H I S  I S", canvas.width / 2, 160);

    this.context.font = '700 80px "Avenir Next"';
    this.context.fillText(this.artistName, canvas.width / 2, 260); 

    const gradient = this.context.createLinearGradient(0, 0, 0, 1000);
    gradient.addColorStop(0, "#E7DDE0");
    gradient.addColorStop(1, "#6C84B0");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 400, canvas.width, 600);

    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  export() {
    return this.canvas.toDataURL('image/jpeg', 1.0);
  }
}

const coverArt = new CoverArt(canvas);

document.querySelector('#artist-name').addEventListener('input', (event) => {
  coverArt.setArtistName(event.target.value);
})

document.querySelector('.container').appendChild(canvas);

document.getElementById('download').addEventListener("click", () => {
    downloadImage(coverArt.export(), `this-is-${coverArt.artistName.toLowerCase().replace(' ', '-')}.jpeg`);
});

function downloadImage(data, filename = 'untitled.jpeg') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}
