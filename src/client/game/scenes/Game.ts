import { Scene } from 'phaser';

export class Game extends Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2, 'Welcome to Map 1!', {
        fontFamily: 'Arial Black',
        fontSize: '38px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);
  }
}
