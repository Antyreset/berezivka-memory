const map = L.map('map').setView([48.3794, 31.1656], 6); // Центр України

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Приклад маркера
L.marker([50.4501, 30.5234]).addTo(map)
  .bindPopup('<strong>Олександр Ковальчук</strong><br>Загинув у бою за Бахмут');