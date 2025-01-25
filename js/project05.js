document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');
  const brushSizeInput = document.getElementById('brushSize');
  const brushColorInput = document.getElementById('brushColor');
  const canvasBgColorInput = document.getElementById('canvasBgColor');
  const undoButton = document.getElementById('undoButton');
  const clearButton = document.getElementById('clearButton');
  const saveButton = document.getElementById('saveButton');

  let drawing = false;
  let brushSize = brushSizeInput.value;
  let brushColor = brushColorInput.value;
  let canvasBgColor = canvasBgColorInput.value;
  let paths = [];
  let currentPath = [];

  function startDrawing(event) {
    drawing = true;
    currentPath = [];
    addPoint(event);
  }

  function stopDrawing() {
    if (drawing) {
      drawing = false;
      paths.push([...currentPath]);
      currentPath = [];
    }
  }

  function draw(event) {
    if (!drawing) return;
    addPoint(event);
    redraw();
  }

  function addPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    currentPath.push({ x, y, size: brushSize, color: brushColor });
  }

  function redraw() {
    ctx.fillStyle = canvasBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    paths.forEach(path => {
      ctx.beginPath();
      path.forEach((point, index) => {
        ctx.lineWidth = point.size;
        ctx.strokeStyle = point.color;
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
    if (currentPath.length > 0) {
      ctx.beginPath();
      currentPath.forEach((point, index) => {
        ctx.lineWidth = point.size;
        ctx.strokeStyle = point.color;
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    }
  }

  function undo() {
    if (paths.length > 0) {
      paths.pop();
      redraw();
    }
  }

  function clearCanvas() {
    paths = [];
    redraw();
  }

  function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  brushSizeInput.addEventListener('input', (event) => {
    brushSize = event.target.value;
  });

  brushColorInput.addEventListener('input', (event) => {
    brushColor = event.target.value;
  });

  canvasBgColorInput.addEventListener('input', (event) => {
    canvasBgColor = event.target.value;
    redraw();
  });

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseout', stopDrawing);

  undoButton.addEventListener('click', undo);
  clearButton.addEventListener('click', clearCanvas);
  saveButton.addEventListener('click', saveCanvas);

  redraw();
});
