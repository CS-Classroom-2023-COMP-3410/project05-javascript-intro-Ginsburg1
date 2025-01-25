document.addEventListener('DOMContentLoaded', () => {
    const clock = document.getElementById('clock');
    const toggleFormatButton = document.getElementById('toggleFormat');
    const colorPicker = document.getElementById('colorPicker');
    const fontSizeInput = document.getElementById('fontSize');
    const setAlarmButton = document.getElementById('setAlarm');
    let is24HourFormat = true;
    let alarmTime = null;

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        if (!is24HourFormat) {
            hours = hours % 12 || 12;
        }
        clock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (alarmTime && now.getHours() === alarmTime.hours && now.getMinutes() === alarmTime.minutes && now.getSeconds() === alarmTime.seconds) {
            alert('Alarm!');
            alarmTime = null;
        }
    }

    toggleFormatButton.addEventListener('click', () => {
        is24HourFormat = !is24HourFormat;
    });

    colorPicker.addEventListener('input', (event) => {
        clock.style.color = event.target.value;
    });

    fontSizeInput.addEventListener('input', (event) => {
        clock.style.fontSize = `${event.target.value}px`;
    });

    setAlarmButton.addEventListener('click', () => {
        const time = prompt('Enter alarm time (HH:MM:SS)');
        const [hours, minutes, seconds] = time.split(':').map(Number);
        alarmTime = { hours, minutes, seconds };
    });

    setInterval(updateClock, 1000);
    updateClock();
});
