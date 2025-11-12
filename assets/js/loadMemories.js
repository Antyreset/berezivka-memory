fetch('assets/data/memories.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('memories-container');
    data.forEach(memory => {
      const block = document.createElement('div');
      block.className = 'memory-block';
      block.innerHTML = `
        <h3>${memory.author}</h3>
        <p><em>${memory.hero}</em></p>
        <p>${memory.text}</p>
      `;
      container.appendChild(block);
    });
  });
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('photo');
  const fileNameDisplay = document.getElementById('file-name');

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', function () {
      const fileName = this.files[0]?.name || 'Файл не обрано';
      fileNameDisplay.textContent = fileName;
    });
  }
});