const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

contexto.lineWidth = 5;
contexto.strokeStyle = 'black';
contexto.lineCap = 'round';
contexto.lineJoin = 'round';

contexto.shadowBlur = 15;        
contexto.shadowColor = '#5a16ce';  
contexto.strokeStyle = '#0a0a0a';  

//cabeaça
contexto.arc(210, 200, 40, 0, Math.PI * 2, true);
contexto.stroke();
//tronco
contexto.beginPath();
contexto.moveTo(200, 300);
contexto.lineTo(200, 240);
contexto.stroke();
contexto.beginPath();
//pernas
contexto.moveTo(200, 300);
contexto.lineTo(170, 350);
contexto.lineTo(200, 300);
contexto.lineTo(230, 350);
contexto.lineTo(200, 300);
contexto.stroke();
//reta da perna esquerda
contexto.beginPath();
contexto.moveTo(170, 350);
contexto.lineTo(170, 400);
contexto.stroke();
contexto.beginPath();
//reta da perna direita
contexto.moveTo(230, 350);
contexto.lineTo(230, 400);
contexto.stroke();
contexto.beginPath();
//braços
contexto.moveTo(150, 270);
contexto.lineTo(200, 240);
contexto.lineTo(240, 270);
contexto.stroke();
contexto.beginPath();
//linha braço esquerdo
contexto.moveTo(150, 270);
contexto.lineTo(210, 285);
contexto.stroke();
contexto.beginPath();
//linha braço direito
contexto.moveTo(240, 270);
contexto.lineTo(270, 230);
contexto.stroke();

// Capacete e óculos de combate
contexto.beginPath();
contexto.arc(210, 195, 43, Math.PI, 0); // Casco do capacete
contexto.stroke();

// Placa de colete militar quadrado
contexto.beginPath();
contexto.moveTo(185, 245);
contexto.lineTo(215, 245);
contexto.lineTo(215, 295);
contexto.lineTo(185, 295);
contexto.closePath();
contexto.stroke();

