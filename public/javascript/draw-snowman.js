//function to draw the snowman by addinng a different body part for each wrong guess

export function drawSnowman(option) {

    const canvas = document.getElementById("canvas-area");
    const ctx = canvas.getContext("2d");
    const snowmanHeight = 150;

	switch (option) {
		case 1:
			ctx.beginPath();
			ctx.arc(150, 470 - snowmanHeight / 2, snowmanHeight / 1.25, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(82, 177, 255)';
			ctx.fill();
			break;
		case 2:
			// Draw the middle body
			ctx.beginPath();
			ctx.arc(150, 300 - snowmanHeight / 2, snowmanHeight / 2, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(82, 177, 255)';
			ctx.fill();
			break;
		case 3:
			// Draw the head
			ctx.beginPath();
			ctx.arc(150, 200 - snowmanHeight / 2, snowmanHeight / 4, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(82, 177, 255)';
			ctx.fill();
			break;
		case 4:
			// Draw the left eye
			ctx.beginPath();
			ctx.arc(140, 180 - snowmanHeight / 2, 5, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();
			break;
		case 5:
			// Draw the right eye
			ctx.beginPath();
			ctx.arc(160, 180 - snowmanHeight / 2, 5, 0, 2 * Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();
			break;
		case 6:
			// Draw the frown
			ctx.beginPath();
			ctx.arc(150, 205 - snowmanHeight / 2, 10, 1.2*Math.PI, 1.8*Math.PI);
			ctx.stroke();
			break;
		default:
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			break;
	}
}