// Renderer for the game canvas
import { SURFACE_DEFINITIONS, getSurfaceColor } from './surfaces';
export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 1500;
        this.height = 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    getWidth() { return this.width; }
    getHeight() { return this.height; }
    clear() {
        // Sky gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        // Grid lines for visual reference
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    drawTrack(track, checkpointsPassed) {
        for (const block of track.blocks) {
            this.drawBlock(block, checkpointsPassed, track.checkpoints);
        }
    }
    drawBlock(block, checkpointsPassed, allCheckpoints) {
        const { center, width, height, type, surfaceType, specialEffect } = block;
        const x = center.x - width / 2;
        const y = center.y - height / 2;
        this.ctx.save();
        switch (type) {
            case 'surface':
                this.drawSurfaceBlock(x, y, width, height, surfaceType);
                break;
            case 'booster':
                this.drawBoosterBlock(x, y, width, height);
                break;
            case 'checkpoint':
                this.drawCheckpoint(x, y, width, height, block.id, allCheckpoints);
                break;
            case 'finish':
                this.drawFinishLine(x, y, width, height);
                break;
            case 'start':
                this.drawStartLine(x, y, width, height);
                break;
            case 'trigger':
                this.drawTriggerBlock(x, y, width, height, specialEffect);
                break;
        }
        this.ctx.restore();
    }
    drawSurfaceBlock(x, y, width, height, surface) {
        const color = getSurfaceColor(surface);
        const props = SURFACE_DEFINITIONS[surface];
        // Main surface
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        // Surface texture/detail
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 2;
        if (surface === 'asphalt') {
            // Road markings
            this.ctx.setLineDash([10, 10]);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + height / 2);
            this.ctx.lineTo(x + width, y + height / 2);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
        else if (surface === 'ice') {
            // Ice shine effect
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(x + 5, y + 5, width - 10, height / 3);
        }
        else if (surface === 'grass') {
            // Grass texture dots
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            for (let i = 0; i < 10; i++) {
                const dx = x + Math.random() * width;
                const dy = y + Math.random() * height;
                this.ctx.beginPath();
                this.ctx.arc(dx, dy, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        else if (surface === 'dirt') {
            // Dirt texture
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            for (let i = 0; i < 15; i++) {
                const dx = x + Math.random() * width;
                const dy = y + Math.random() * height;
                this.ctx.beginPath();
                this.ctx.arc(dx, dy, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        else if (surface === 'plastic') {
            // Plastic shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.fillRect(x, y, width, 3);
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x, y, width, height);
        }
        // Border
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
    }
    drawBoosterBlock(x, y, width, height) {
        // Animated golden booster
        const time = Date.now() / 200;
        const intensity = 0.5 + Math.sin(time) * 0.5;
        this.ctx.fillStyle = `rgba(255, 215, 0, ${0.6 + intensity * 0.4})`;
        this.ctx.fillRect(x, y, width, height);
        // Arrow pattern
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        const arrowCount = 3;
        for (let i = 0; i < arrowCount; i++) {
            const ax = x + (width / (arrowCount + 1)) * (i + 1);
            const ay = y + height / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(ax - 8, ay - 10);
            this.ctx.lineTo(ax + 8, ay);
            this.ctx.lineTo(ax - 8, ay + 10);
            this.ctx.closePath();
            this.ctx.fill();
        }
        // Glow effect
        this.ctx.shadowColor = '#ffd700';
        this.ctx.shadowBlur = 15;
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.shadowBlur = 0;
    }
    drawCheckpoint(x, y, width, height, id, allCheckpoints) {
        const index = allCheckpoints.indexOf(id);
        // Checkerboard pattern
        const squareSize = 10;
        for (let row = 0; row < height / squareSize; row++) {
            for (let col = 0; col < width / squareSize; col++) {
                this.ctx.fillStyle = (row + col) % 2 === 0 ? '#ffffff' : '#1a1a1a';
                this.ctx.fillRect(x + col * squareSize, y + row * squareSize, squareSize, squareSize);
            }
        }
        // Glow effect
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 2;
        this.ctx.shadowColor = '#ffd700';
        this.ctx.shadowBlur = 10;
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.shadowBlur = 0;
    }
    drawFinishLine(x, y, width, height) {
        // Checkered finish
        const squareSize = 10;
        for (let row = 0; row < height / squareSize; row++) {
            for (let col = 0; col < width / squareSize; col++) {
                this.ctx.fillStyle = (row + col) % 2 === 0 ? '#000000' : '#ffffff';
                this.ctx.fillRect(x + col * squareSize, y + row * squareSize, squareSize, squareSize);
            }
        }
        // Glow
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = '#00ff00';
        this.ctx.shadowBlur = 15;
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.shadowBlur = 0;
    }
    drawStartLine(x, y, width, height) {
        // Start line
        this.ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = '#00aaff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
    }
    drawTriggerBlock(x, y, width, height, effect) {
        // Semi-transparent trigger zones
        let color;
        let label;
        switch (effect) {
            case 'noBrakes':
                color = 'rgba(255, 100, 100, 0.4)';
                label = 'NO BRAKES';
                break;
            case 'noSteering':
                color = 'rgba(100, 100, 255, 0.4)';
                label = 'NO STEER';
                break;
            case 'fragile':
                color = 'rgba(255, 200, 100, 0.4)';
                label = 'FRAGILE';
                break;
            case 'engineOff':
                color = 'rgba(150, 150, 150, 0.4)';
                label = 'COAST';
                break;
            default:
                color = 'rgba(255, 255, 255, 0.2)';
                label = '';
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        if (label) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 10px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(label, x + width / 2, y + height / 2);
        }
        this.ctx.strokeStyle = color.replace('0.4', '0.8');
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.setLineDash([]);
    }
    drawCar(car) {
        const { position, rotation, steeringAngle, isDrifting, isAirborne } = car;
        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.rotate(rotation);
        // Car shadow
        if (!isAirborne) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(3, 3, 18, 10, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
        // Car body
        const carLength = 36;
        const carWidth = 18;
        // Main body color based on state
        let bodyColor = '#e74c3c';
        if (isAirborne)
            bodyColor = '#3498db';
        if (isDrifting)
            bodyColor = '#f39c12';
        this.ctx.fillStyle = bodyColor;
        // Draw car shape
        this.ctx.beginPath();
        this.ctx.moveTo(-carLength / 2, -carWidth / 2);
        this.ctx.lineTo(carLength / 2 - 5, -carWidth / 2);
        this.ctx.lineTo(carLength / 2, 0);
        this.ctx.lineTo(carLength / 2 - 5, carWidth / 2);
        this.ctx.lineTo(-carLength / 2, carWidth / 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Car outline
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        // Windshield
        this.ctx.fillStyle = 'rgba(200, 230, 255, 0.7)';
        this.ctx.fillRect(5, -carWidth / 2 + 3, 8, carWidth - 6);
        // Front wheels (steerable)
        const wheelOffset = carLength / 2 - 5;
        const wheelWidth = 6;
        const wheelHeight = 4;
        this.ctx.save();
        this.ctx.translate(wheelOffset, -carWidth / 2 - 2);
        this.ctx.rotate(steeringAngle * 0.5);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(-wheelWidth / 2, -wheelHeight / 2, wheelWidth, wheelHeight);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.translate(wheelOffset, carWidth / 2 + 2);
        this.ctx.rotate(steeringAngle * 0.5);
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(-wheelWidth / 2, -wheelHeight / 2, wheelWidth, wheelHeight);
        this.ctx.restore();
        // Rear wheels
        const rearOffset = -carLength / 2 + 5;
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(rearOffset - wheelWidth / 2, -carWidth / 2 - 2, wheelWidth, wheelHeight);
        this.ctx.fillRect(rearOffset - wheelWidth / 2, carWidth / 2 + 2 - wheelHeight, wheelWidth, wheelHeight);
        // Drift sparks
        if (isDrifting) {
            this.ctx.fillStyle = '#ffff00';
            const sparkCount = 3;
            for (let i = 0; i < sparkCount; i++) {
                const sx = -carLength / 2 - 5 + Math.random() * 10;
                const sy = (Math.random() - 0.5) * 30;
                const size = 2 + Math.random() * 3;
                this.ctx.beginPath();
                this.ctx.arc(sx, sy, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        // Boost effect
        if (car.effects.has('boosted')) {
            this.ctx.fillStyle = '#ffd700';
            const flameLength = 15 + Math.random() * 10;
            this.ctx.beginPath();
            this.ctx.moveTo(-carLength / 2, -5);
            this.ctx.lineTo(-carLength / 2 - flameLength, 0);
            this.ctx.lineTo(-carLength / 2, 5);
            this.ctx.closePath();
            this.ctx.fill();
            // Glow
            this.ctx.shadowColor = '#ffd700';
            this.ctx.shadowBlur = 20;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        this.ctx.restore();
        // Speed lines when moving fast
        if (car.speed > 150) {
            const intensity = (car.speed - 150) / 100;
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${intensity * 0.3})`;
            this.ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                const lx = position.x - 20 - Math.random() * 30;
                const ly = position.y + (Math.random() - 0.5) * 40;
                this.ctx.beginPath();
                this.ctx.moveTo(lx, ly);
                this.ctx.lineTo(lx - 20 - Math.random() * 20, ly);
                this.ctx.stroke();
            }
        }
    }
    drawCountdown(timeRemaining) {
        const seconds = Math.ceil(timeRemaining / 1000);
        const text = seconds > 0 ? seconds.toString() : 'GO!';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = seconds > 0 ? '#ffffff' : '#00ff00';
        this.ctx.font = `bold ${seconds > 0 ? 120 : 80}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = seconds > 0 ? '#ffffff' : '#00ff00';
        this.ctx.shadowBlur = 30;
        this.ctx.fillText(text, this.width / 2, this.height / 2);
        this.ctx.shadowBlur = 0;
    }
    drawFinishMessage(time, medal) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const millis = Math.floor(time % 1000);
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
        const medalEmojis = {
            bronze: '🥉 Bronze',
            silver: '🥈 Silver',
            gold: '🥇 Gold',
            author: '⭐ Author!'
        };
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('FINISH!', this.width / 2, this.height / 2 - 80);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 48px Courier New';
        this.ctx.fillText(`Time: ${timeStr}`, this.width / 2, this.height / 2);
        if (medal) {
            this.ctx.fillStyle = '#ffd700';
            this.ctx.font = 'bold 36px Arial';
            this.ctx.fillText(medalEmojis[medal] || medal, this.width / 2, this.height / 2 + 60);
        }
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press R to restart', this.width / 2, this.height / 2 + 120);
    }
    drawSpeedLines(speed) {
        if (speed < 100)
            return;
        const intensity = (speed - 100) / 200;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${intensity * 0.2})`;
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const len = 20 + Math.random() * 40;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - len, y);
            this.ctx.stroke();
        }
    }
}
