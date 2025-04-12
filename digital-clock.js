// Array of time zones to display
const timeZones = [
  { label: 'UTC', zone: 'UTC' },
  { label: 'New York', zone: 'America/New_York' },
  { label: 'London', zone: 'Europe/London' },
  { label: 'Tokyo', zone: 'Asia/Tokyo' },
  { label: 'Sydney', zone: 'Australia/Sydney' },
  { label: 'Boksburg (SAST)', zone: 'Africa/Johannesburg' }, // Added your local time zone
];

// Function to format and display time for a given time zone
function getTimeForZone(zone) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: zone,
    hour12: false,
  }).format(new Date());
}

// Function to update the clock
function updateClock() {
  const clockContainer = document.getElementById('clock-container');
  clockContainer.innerHTML = ''; // Clear existing content

  timeZones.forEach(({ label, zone }) => {
    const time = getTimeForZone(zone);
    const timeElement = document.createElement('div');
    timeElement.innerHTML = `<strong>${label}:</strong> ${time}`;
    clockContainer.appendChild(timeElement);
  });
}

// Initialize the clock
function initClock() {
  const clockContainer = document.createElement('div');
  clockContainer.id = 'clock-container';
  document.body.appendChild(clockContainer);

  // Update the clock every second
  setInterval(updateClock, 1000);
}

// Start the clock when the DOM is loaded
document.addEventListener('DOMContentLoaded', initClock);
