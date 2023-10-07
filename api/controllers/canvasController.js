const { promises } = require("fs");
const { join } = require("path");
const {
  GlobalFonts,
  loadImage,
  createCanvas,
  Image,
} = require("@napi-rs/canvas");
const { readFile } = require("fs/promises");
const { request } = require("undici");

console.log(
  `Registered font: ${GlobalFonts.registerFromPath(
    "./fonts/Roboto/Roboto-Regular.ttf",
    "roboto-regular"
  )}`
);
console.log(
  `Registered font: ${GlobalFonts.registerFromPath(
    "./fonts/AppleColorEmoji@2x.ttf",
    "Apple Color Emoji"
  )}`
);
console.log(
  `Registered font: ${GlobalFonts.registerFromPath(
    "./fonts/COLR-v1.ttf",
    "COLRv1"
  )}`
);

const drawProgressBar = (
  context,
  progress,
  x,
  y,
  height,
  width,
  color = "#0099ff",
  borderWidth = 2
) => {
  const radius = height / 2;
  const bgWidth = width + (borderWidth / 2) * 2;
  const bgHeight = height + (borderWidth / 2) * 2;
  const bgX = x - borderWidth / 2;
  const bgY = y - borderWidth / 2;
  const bgRadius = radius + borderWidth / 2;

  // Draw the background
  context.lineWidth = borderWidth;
  context.strokeStyle = "#0099ff";
  context.fillStyle = "#cccccc22";
  context.beginPath();
  context.arc(
    bgX + bgRadius,
    bgY + bgRadius,
    bgRadius,
    Math.PI / 2,
    Math.PI * 1.5
  );

  context.lineTo(bgX + bgWidth - bgRadius, bgY);
  context.arc(
    bgX + bgWidth - bgRadius,
    bgY + bgRadius,
    bgRadius,
    -Math.PI / 2,
    Math.PI / 2
  );

  context.lineTo(bgX + bgRadius, bgY + bgHeight);
  context.arc(
    bgX + bgRadius,
    bgY + bgHeight - bgRadius,
    bgRadius,
    Math.PI / 2,
    Math.PI * 1.5
  );

  context.lineTo(bgX, bgY + bgRadius);
  context.closePath();
  context.stroke();
  context.fill();

  if (progress <= 0) return;
  // Draw the progress bar
  context.fillStyle = color;
  context.beginPath();
  context.arc(x + radius, y + radius, radius, Math.PI / 2, Math.PI * 1.5);
  context.lineTo(x + width * progress - radius, y);
  context.arc(
    x + width * progress - radius,
    y + radius,
    radius,
    -Math.PI / 2,
    Math.PI / 2
  );
  context.lineTo(x + radius, y + height);
  context.closePath();
  context.fill();
};

// Pass the entire Canvas object because you'll need access to its width and context
const applyText = (canvas, text) => {
  const context = canvas.getContext("2d");

  // Declare a base size of the font
  let fontSize = 70;

  do {
    // Assign the font to the context and decrement it so it can be measured again
    context.font = `${(fontSize -= 10)}px roboto-regular`;
    // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (context.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return context.font;
};

const rightAlignText = (context, text, x, y) => {
  const metrics = context.measureText(text);
  context.fillText(text, x - metrics.width, y);
}

const drawVoiceXpBar = (canvas, context, percent, color = "#ff0000", xp, xpNext, level) => {
  const x = canvas.width / 2.5;
  const y = canvas.height - 40;
  const width = canvas.width - x - 20;
  const height = 20;
  context.fillStyle = "#ffffff";
  context.font = '18px Apple Color Emoji'
  context.strokeText('🎤', x, y - 2.5)
  context.font = "18px roboto-regular";
  context.fillText(`Voice Level ${level}`, x + 25, y - 5);
  rightAlignText(context, `${xp}/${xpNext}xp`, canvas.width - 20, y - 5);
  drawProgressBar(context, percent, x, y, height, width, color);
};

const drawXpBar = (canvas, context, percent, color = "#00ff00", xp, xpNext, level) => {
  const x = canvas.width / 2.5;
  const y = canvas.height - 85;
  const width = canvas.width - x - 20;
  const height = 20;
  context.font = '18px Apple Color Emoji'
  context.strokeText('💬', x, y - 2.5)
  context.font = "18px roboto-regular";
  context.fillStyle = "#ffffff";
  context.fillText(`Text Level ${level}`, x + 25, y - 5);
  rightAlignText(context, `${xp}/${xpNext}xp`, canvas.width - 20, y - 5);
  drawProgressBar(context, percent, x, y, height, width, color);
};

async function generateImage(req, res, next) {
  try {
    console.log(req.body);
    var payload = req.body;
    var profileImage = payload.avatarUrl;
    var textXpPercent = Math.max(0.05, (payload.xpForNextTextLevel > 0) ? payload.textXp / payload.xpForNextTextLevel : 0);
    var voiceXpPercent = Math.max(0.05, (payload.xpForNextVoiceLevel > 0) ? payload.voiceXp / payload.xpForNextVoiceLevel : 0);
    const canvas = createCanvas(700, 250);
    const context = canvas.getContext("2d");

    const background = await readFile(join(__dirname, "./wallpaper.jpg"));
    const backgroundImage = new Image();
    backgroundImage.src = background;

    const cornerRadius = 20; // Set the corner radius to 20 pixels

    // Draw the rounded rectangle
    context.beginPath();
    context.moveTo(cornerRadius, 0);
    context.lineTo(canvas.width - cornerRadius, 0);
    context.arcTo(canvas.width, 0, canvas.width, cornerRadius, cornerRadius);
    context.lineTo(canvas.width, canvas.height - cornerRadius);
    context.arcTo(
      canvas.width,
      canvas.height,
      canvas.width - cornerRadius,
      canvas.height,
      cornerRadius
    );
    context.lineTo(cornerRadius, canvas.height);
    context.arcTo(
      0,
      canvas.height,
      0,
      canvas.height - cornerRadius,
      cornerRadius
    );
    context.lineTo(0, cornerRadius);
    context.arcTo(0, 0, cornerRadius, 0, cornerRadius);
    context.closePath();

    // Use the rounded rectangle as a clipping path
    context.clip();

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    const borderWidth = 3; // Set the width of the border
    context.strokeStyle = "#ff0000"; // Set the color of the border
    context.lineWidth = borderWidth; // Set the width of the border

    // Draw the border inside the clipped path with rounded corners
    context.beginPath();
    context.moveTo(cornerRadius, 0);
    context.lineTo(canvas.width - cornerRadius, 0);
    context.arcTo(canvas.width, 0, canvas.width, cornerRadius, cornerRadius);
    context.lineTo(canvas.width, canvas.height - cornerRadius);
    context.arcTo(
      canvas.width,
      canvas.height,
      canvas.width - cornerRadius,
      canvas.height,
      cornerRadius
    );
    context.lineTo(cornerRadius, canvas.height);
    context.arcTo(
      0,
      canvas.height,
      0,
      canvas.height - cornerRadius,
      cornerRadius
    );
    context.lineTo(0, cornerRadius);
    context.arcTo(0, 0, cornerRadius, 0, cornerRadius);
    context.closePath();
    context.stroke();

    drawXpBar(canvas, context, textXpPercent, "#00ff00", payload.textXp, payload.xpForNextTextLevel, payload.textLevel);
    drawVoiceXpBar(canvas, context, voiceXpPercent, "#ff0000", payload.voiceXp, payload.xpForNextVoiceLevel, payload.voiceLevel);

    context.font = "28px roboto-regular";
    context.fillStyle = "#ffffff";
    context.fillText("Rank Card", canvas.width / 2.5, canvas.height / 4);

    const userName = `${payload.userName}`;
    if (payload.userDiscriminator !== undefined && payload.userDiscriminator !== null) {
      userName += `#${payload.userDiscriminator}`;
    }
    context.font = applyText(canvas, userName);
    context.fillStyle = "#ffffff";
    context.fillText(userName, canvas.width / 2.5, canvas.height / 2);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    
    const { body: avatarBody } = await request(
      profileImage ?? "https://cdn.discordapp.com/avatars/1152378737694875699/ececbf9dc78e1d839ed3d4368ccff571.jpg?size=1024"
    );

    const avatarImage = await loadImage(await avatarBody.arrayBuffer());
    context.drawImage(avatarImage, 25, 25, 200, 200);

    const output = await canvas.encode("png");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": output.length,
      "Content-Disposition": "inline; filename=wallpaper.png",
    });

    res.end(output);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
}

exports.get_image = generateImage;

exports.get_image2 = async (req, res, next) => {};
