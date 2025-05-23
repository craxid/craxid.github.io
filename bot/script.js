const yearSpan = document.getElementById('currentYear');
        const currentYear = new Date().getFullYear();
        if (yearSpan) {
            yearSpan.textContent = currentYear;
        }

        const timeSpan = document.getElementById('current-time');

        function updateTime() {
            const now = new Date();
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const dayName = days[now.getDay()];
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const monthName = months[now.getMonth()];
            const date = now.getDate();
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const formattedString = `${hours}:${minutes}:${seconds}`;

            if (timeSpan) {
                timeSpan.textContent = formattedString;
            }
        }

        updateTime();
        setInterval(updateTime, 1000);

        const batteryStatusDiv = document.getElementById('battery-status');
        const batteryOutlineDiv = batteryStatusDiv ? batteryStatusDiv.querySelector('.battery-outline') : null;
        const batteryFillDiv = batteryStatusDiv ? batteryStatusDiv.querySelector('.battery-fill') : null;
        const batteryTextSpan = batteryStatusDiv ? batteryStatusDiv.querySelector('.battery-text') : null;
        const lightningIcon = batteryStatusDiv ? batteryStatusDiv.querySelector('.lightning-icon') : null;

        if ('getBattery' in navigator) {
            navigator.getBattery().then(function(battery) {
                function updateBatteryDisplay() {
                    const levelPercentage = Math.round(battery.level * 100);

                    if (batteryFillDiv) {
                        batteryFillDiv.style.width = levelPercentage + '%';
                        batteryFillDiv.classList.remove('low', 'medium', 'charging');
                        if (battery.charging) {
                            batteryFillDiv.classList.add('charging');
                        } else if (levelPercentage < 20) {
                            batteryFillDiv.classList.add('low');
                        } else if (levelPercentage < 50) {
                             batteryFillDiv.classList.add('medium');
                        }
                         // Jika >= 50% dan tidak charging, warnanya tetap default (hijau)
                    }

                    if (batteryTextSpan) {
                         batteryTextSpan.textContent = levelPercentage + '%';
                    }

                    if (lightningIcon) {
                        if (battery.charging) {
                            lightningIcon.style.display = 'block';
                        } else {
                            lightningIcon.style.display = 'none';
                        }
                    }
                }

                updateBatteryDisplay();
                battery.addEventListener('levelchange', updateBatteryDisplay);
                battery.addEventListener('chargingchange', updateBatteryDisplay);
            }).catch(function(error) {
                console.error('Error accessing Battery Status API: ', error);
                 if (batteryStatusDiv) {
                    batteryStatusDiv.style.display = 'none';
                }
            });
        } else {
            if (batteryStatusDiv) {
                batteryStatusDiv.style.display = 'none';
            }
        }