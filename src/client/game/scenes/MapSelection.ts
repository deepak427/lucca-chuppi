import { Scene } from 'phaser';

export class MapSelection extends Scene {
  constructor() {
    super('MapSelection');
  }

  create() {
    const { width, height } = this.scale;

    // Title
    this.add
      .text(width / 2, height * 0.2, 'Select a Map', {
        fontFamily: 'Arial Black',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);

    // Map Card
    const mapCard = this.add
      .rectangle(width / 2, height / 2, 300, 200, 0x666666)
      .setStrokeStyle(4, 0xffffff)
      .setInteractive({ useHandCursor: true });

    const mapTitle = this.add
      .text(mapCard.x, mapCard.y, 'Map 1', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    mapCard.on('pointerdown', () => {
      this.scene.start('Game', { mapKey: 'map1' });
    });

    mapCard.on('pointerover', () => {
      mapCard.setFillStyle(0x777777);
    });

    mapCard.on('pointerout', () => {
      mapCard.setFillStyle(0x666666);
    });
  }
}
