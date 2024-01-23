import {GameManager} from './engine/GameManager.js';

const canvas = document.getElementById("mainCanvas")

const ctx = canvas.getContext('2d');

GameManager.startGame(ctx);