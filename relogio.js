// set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

let counter = 0;

function drawClock() {
  // Get the current time
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Clear the canvas
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

  // Draw the clock face
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'green';
  ctx.fill();

  // Draw the clock numbers
  drawNumbers();

  // Draw the clock hands
  drawTime(hour, minute, second);

  // Increment the counter
  counter++;

  // Stop the loop after 100 iterations
  if (counter > 100) {
    clearInterval(interval);
  }
}

// draw clock numbers
function drawNumbers() {
  ctx.font = radius * 0.15 + 'px arial';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  for (let num = 1; num < 13; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

// draw clock hands
function drawTime(hour, minute, second) {
  // draw hour hand
  ctx.save();
  ctx.rotate(
    hour * (Math.PI / 6) + (Math.PI / 360) * minute + (Math.PI / 21600) * second
  );
  ctx.lineWidth = radius * 0.07;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.restore();

  // draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * minute + (Math.PI / 1800) * second);
  ctx.lineWidth = radius * 0.07;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.8);
  ctx.stroke();
  ctx.restore();

  // draw second hand
  ctx.save();
  ctx.rotate((second * Math.PI) / 30);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#FFFF00';
  ctx.lineWidth = radius * 0.02;
  ctx.beginPath();
  ctx.moveTo(-radius * 0.05, 0);
  ctx.lineTo(radius * 0.2, 0);
  ctx.lineTo(radius * 0.05, 0);
  ctx.lineTo(radius * 0.1, 0);
  ctx.lineTo(-radius * 0.05, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Update the clock every 1000 milliseconds (1 second)
let interval = setInterval(drawClock, 1000);
