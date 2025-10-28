import { Scene, GameObjects } from 'phaser';

export class Game extends Scene {
  private mapKey: string;
  private hidingSpot: GameObjects.Arc;
  private shareButton: GameObjects.Text;

  constructor() {
    super('Game');
  }

  init(data: { mapKey: string }) {
    this.mapKey = data.mapKey;
  }

  create() {
    const { width, height } = this.scale;

    // Display the map
    const map = this.add.image(width / 2, height / 2, this.mapKey);

    // Allow the player to place a marker
    map.setInteractive();
    map.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.hidingSpot) {
        this.hidingSpot.destroy();
      }
      this.hidingSpot = this.add.circle(pointer.x, pointer.y, 10, 0xff0000);
      this.shareButton.setVisible(true);
    });

    // Add a share button
    this.shareButton = this.add
      .text(width / 2, height - 50, 'Share', {
        fontFamily: 'Arial Black',
        fontSize: '38px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setVisible(false);

    this.shareButton.on('pointerdown', async () => {
      this.shareButton.setText('Sharing...').disableInteractive();
      this.hidingSpot.setVisible(false);

      this.game.renderer.snapshot(async (image: HTMLImageElement) => {
        this.hidingSpot.setVisible(true);

        try {
          const response = await fetch('/api/share', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageData: image.src,
              hidingSpot: {
                x: this.hidingSpot.x,
                y: this.hidingSpot.y,
              },
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to share post.');
          }

          const { postUrl } = await response.json();
          this.shareButton.setText('Shared!').setInteractive();
          window.open(postUrl, '_blank');
        } catch (error) {
          console.error('Error sharing post:', error);
          this.shareButton.setText('Error!').setInteractive();
        }
      });
    });
  }
}
