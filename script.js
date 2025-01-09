// Set the fixed current time (as provided)
const CURRENT_TIME = new Date('2025-01-09T15:32:17+01:00');

// Language handling
let currentLanguage = 'en';

function updateLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Time formatting functions
function formatTime(date) {
    return date.toLocaleTimeString(currentLanguage, { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function formatDate(date) {
    return date.toLocaleDateString(currentLanguage, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getTimezone(date) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Reminders functionality
class Reminder {
    constructor(title, time, repeat) {
        this.id = Date.now();
        this.title = title;
        this.time = new Date(time);
        this.repeat = repeat;
        this.active = true;
    }

    isTimeToTrigger(currentTime) {
        if (!this.active) return false;
        
        const reminderTime = new Date(this.time);
        if (currentTime >= reminderTime) {
            if (this.repeat === 'none') {
                this.active = false;
                return true;
            }
            
            // Handle repeating reminders
            switch(this.repeat) {
                case 'daily':
                    this.time.setDate(this.time.getDate() + 1);
                    break;
                case 'weekly':
                    this.time.setDate(this.time.getDate() + 7);
                    break;
                case 'monthly':
                    this.time.setMonth(this.time.getMonth() + 1);
                    break;
            }
            return true;
        }
        return false;
    }
}

const reminders = [];

function addReminder() {
    const title = document.getElementById('reminder-title').value;
    const time = document.getElementById('reminder-time').value;
    const repeat = document.getElementById('reminder-repeat').value;
    
    if (!title || !time) return;
    
    const reminder = new Reminder(title, time, repeat);
    reminders.push(reminder);
    updateRemindersDisplay();
    
    // Clear form
    document.getElementById('reminder-title').value = '';
    document.getElementById('reminder-time').value = '';
}

function updateRemindersDisplay() {
    const remindersList = document.getElementById('reminders-list');
    remindersList.innerHTML = '';
    
    reminders.forEach(reminder => {
        if (reminder.active) {
            const reminderElement = document.createElement('div');
            reminderElement.className = 'reminder-item';
            reminderElement.innerHTML = `
                <div>
                    <strong>${reminder.title}</strong>
                    <div>${reminder.time.toLocaleString(currentLanguage)}</div>
                    <div>${reminder.repeat !== 'none' ? `Repeats ${reminder.repeat}` : 'One-time'}</div>
                </div>
                <button onclick="deleteReminder(${reminder.id})">×</button>
            `;
            remindersList.appendChild(reminderElement);
        }
    });
}

function deleteReminder(id) {
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
        reminders.splice(index, 1);
        updateRemindersDisplay();
    }
}

// Time tracking functionality
let timerInterval;
let timerRunning = false;
let timerPaused = false;
let timerSeconds = 0;

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerPaused = false;
        timerInterval = setInterval(() => {
            timerSeconds++;
            document.getElementById('timer-display').textContent = formatTime(timerSeconds);
        }, 1000);
        updateButtonStates();
    }
}

function pauseTimer() {
    if (timerRunning && !timerPaused) {
        clearInterval(timerInterval);
        timerPaused = true;
        updateButtonStates();
    } else if (timerPaused) {
        timerPaused = false;
        startTimer();
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    updateButtonStates();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    timerSeconds = 0;
    document.getElementById('timer-display').textContent = formatTime(timerSeconds);
    updateButtonStates();
}

function updateButtonStates() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const stopBtn = document.getElementById('stop-timer');
    const resetBtn = document.getElementById('reset-timer');

    startBtn.disabled = timerRunning && !timerPaused;
    pauseBtn.disabled = !timerRunning;
    stopBtn.disabled = !timerRunning && !timerPaused;
    resetBtn.disabled = timerSeconds === 0;

    // Update button text and icons based on state
    pauseBtn.innerHTML = timerPaused ? 
        '<i class="fas fa-play"></i> Resume' : 
        '<i class="fas fa-pause"></i> Pause';
}

function updateHostTime(timezone) {
    const now = new Date('2025-01-09T17:02:54+01:00'); // Using the provided time

    try {
        // Format time
        const timeOptions = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        // Format date
        const dateOptions = {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        // Format timezone
        const zoneOptions = {
            timeZone: timezone,
            timeZoneName: 'long'
        };

        // Get formatted strings
        const timeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
        const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
        const zoneStr = new Intl.DateTimeFormat('en-US', zoneOptions).format(now).split(', ')[1] || timezone;

        // Update display
        document.getElementById('host-time').textContent = timeStr;
        document.getElementById('host-date').textContent = dateStr;
        document.getElementById('host-timezone').textContent = zoneStr;

        // Add highlight effect
        ['host-time', 'host-date', 'host-timezone'].forEach(id => {
            const element = document.getElementById(id);
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 1000);
        });

    } catch (error) {
        console.error('Error updating host time:', error);
        document.getElementById('host-time').textContent = '--:--:--';
        document.getElementById('host-date').textContent = 'Invalid Timezone';
        document.getElementById('host-timezone').textContent = timezone;
    }
}

function updateLocalTime() {
    const now = new Date('2025-01-09T17:02:54+01:00'); // Using the provided time
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    const timezoneStr = now.toLocaleString('en-US', { timeZoneName: 'long' }).split(', ')[1];

    document.getElementById('time').textContent = timeStr;
    document.getElementById('date').textContent = dateStr;
    document.getElementById('timezone').textContent = timezoneStr;
}

// Meeting Link Parser
function parseMeetingLink(link) {
    const meetingInfo = {
        platform: '',
        meetingId: '',
        password: '',
        time: '',
        date: '',
        duration: '',
        error: null
    };

    try {
        const url = new URL(link);
        
        // Zoom Meeting Parser
        if (url.hostname.includes('zoom.us')) {
            meetingInfo.platform = 'Zoom';
            
            // Extract meeting ID
            const pathParts = url.pathname.split('/');
            const jIndex = pathParts.indexOf('j');
            if (jIndex !== -1 && pathParts[jIndex + 1]) {
                meetingInfo.meetingId = pathParts[jIndex + 1];
            } else {
                const meetingIdMatch = url.pathname.match(/\/(\d{9,11})/);
                if (meetingIdMatch) {
                    meetingInfo.meetingId = meetingIdMatch[1];
                }
            }

            // Extract password
            const pwd = url.searchParams.get('pwd');
            if (pwd) meetingInfo.password = pwd;

            // Extract time and duration from URL parameters
            const time = url.searchParams.get('time');
            if (time) {
                try {
                    const meetingTime = new Date(decodeURIComponent(time));
                    meetingInfo.time = meetingTime.toLocaleTimeString();
                    meetingInfo.date = meetingTime.toLocaleDateString();
                } catch (e) {
                    console.warn('Could not parse meeting time:', e);
                }
            }

            const duration = url.searchParams.get('duration');
            if (duration) {
                meetingInfo.duration = `${duration} minutes`;
            }
        }
        
        // Google Meet Parser
        else if (url.hostname.includes('meet.google.com')) {
            meetingInfo.platform = 'Google Meet';
            
            // Extract meeting code
            const meetCode = url.pathname.split('/').pop();
            if (meetCode) {
                meetingInfo.meetingId = meetCode;
            }

            // Extract time from URL parameters
            const time = url.searchParams.get('time');
            if (time) {
                try {
                    const meetingTime = new Date(parseInt(time));
                    meetingInfo.time = meetingTime.toLocaleTimeString();
                    meetingInfo.date = meetingTime.toLocaleDateString();
                } catch (e) {
                    console.warn('Could not parse meeting time:', e);
                }
            }
        }
        
        // Microsoft Teams Parser
        else if (url.hostname.includes('teams.microsoft.com')) {
            meetingInfo.platform = 'Microsoft Teams';
            
            // Extract meeting ID
            const meetingIdMatch = url.pathname.match(/\/([a-zA-Z0-9_-]{12,})/);
            if (meetingIdMatch) {
                meetingInfo.meetingId = meetingIdMatch[1];
            }

            // Parse meeting details from URL parameters
            const params = new URLSearchParams(url.hash.slice(1));
            
            const startTime = params.get('startTime');
            if (startTime) {
                try {
                    const meetingTime = new Date(startTime);
                    meetingInfo.time = meetingTime.toLocaleTimeString();
                    meetingInfo.date = meetingTime.toLocaleDateString();
                } catch (e) {
                    console.warn('Could not parse meeting time:', e);
                }
            }

            const duration = params.get('duration');
            if (duration) {
                meetingInfo.duration = `${duration} minutes`;
            }
        }
        
        // Cisco Webex Parser
        else if (url.hostname.includes('webex.com')) {
            meetingInfo.platform = 'Cisco Webex';
            
            // Extract meeting number
            const meetingMatch = url.pathname.match(/\/(\d{9,11})/);
            if (meetingMatch) {
                meetingInfo.meetingId = meetingMatch[1];
            }

            // Extract password
            const password = url.searchParams.get('password');
            if (password) {
                meetingInfo.password = password;
            }

            // Parse meeting time and duration
            const startTime = url.searchParams.get('startTime');
            if (startTime) {
                try {
                    const meetingTime = new Date(parseInt(startTime));
                    meetingInfo.time = meetingTime.toLocaleTimeString();
                    meetingInfo.date = meetingTime.toLocaleDateString();
                } catch (e) {
                    console.warn('Could not parse meeting time:', e);
                }
            }

            const duration = url.searchParams.get('duration');
            if (duration) {
                meetingInfo.duration = `${duration} minutes`;
            }
        }

        // If no platform was identified
        if (!meetingInfo.platform) {
            throw new Error('Unsupported meeting platform');
        }

        // If no meeting ID was found
        if (!meetingInfo.meetingId) {
            throw new Error('Could not extract meeting ID');
        }

        return meetingInfo;
    } catch (error) {
        console.error('Error parsing meeting link:', error);
        return {
            ...meetingInfo,
            error: 'Invalid meeting link or unsupported format'
        };
    }
}

// Function to update the UI with meeting information
function updateMeetingInfo(info) {
    const elements = {
        platform: document.getElementById('platform'),
        meetingId: document.getElementById('meeting-id'),
        password: document.getElementById('meeting-password'),
        time: document.getElementById('meeting-time'),
        date: document.getElementById('meeting-date'),
        duration: document.getElementById('meeting-duration')
    };

    // Helper function to update element with animation
    function updateElement(element, value) {
        if (element) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.textContent = value || '-';
                element.style.opacity = '1';
            }, 200);
        }
    }

    // Update each field with fade animation
    Object.entries(elements).forEach(([key, element]) => {
        updateElement(element, info[key]);
    });

    // Add success/error indication
    const meetingDetails = document.getElementById('meeting-details');
    if (meetingDetails) {
        meetingDetails.className = 'meeting-details ' + (info.error ? 'error' : 'success');
    }
}

// Event listener for the parse button
document.getElementById('parse-button').addEventListener('click', function() {
    const linkInput = document.getElementById('meeting-link');
    const link = linkInput.value.trim();
    
    if (!link) {
        updateMeetingInfo({
            error: 'Please enter a meeting link'
        });
        return;
    }

    const meetingInfo = parseMeetingLink(link);
    updateMeetingInfo(meetingInfo);
});

// Event listener for Enter key in the input field
document.getElementById('meeting-link').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('parse-button').click();
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    updateLanguage(currentLanguage);
    
    // Initialize timer display
    document.getElementById('timer-display').textContent = formatTime(0);
    updateButtonStates();

    // Timer control buttons
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('pause-timer').addEventListener('click', pauseTimer);
    document.getElementById('stop-timer').addEventListener('click', stopTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);

    // Initialize times
    updateLocalTime();
    updateHostTime('UTC'); // Start with UTC

    // Country selector
    const countrySelector = document.getElementById('country-selector');
    countrySelector.addEventListener('change', (e) => {
        const selectedTimezone = e.target.value;
        updateHostTime(selectedTimezone);
    });
    
    // Update local time every second
    setInterval(updateLocalTime, 1000);

    // Update host time every second based on selected timezone
    setInterval(() => {
        const selectedTimezone = countrySelector.value;
        updateHostTime(selectedTimezone);
    }, 1000);

    // Request notification permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
