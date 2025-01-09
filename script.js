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
        host: '',
        joinUrl: '',
        error: null
    };

    try {
        const url = new URL(link);
        const hostname = url.hostname.toLowerCase();
        
        // Helper function to extract time from various formats
        const parseTime = (timeStr) => {
            try {
                const date = new Date(timeStr);
                return {
                    time: date.toLocaleTimeString(),
                    date: date.toLocaleDateString()
                };
            } catch (e) {
                console.warn('Could not parse time:', e);
                return null;
            }
        };

        // Platform-specific parsers
        const platformParsers = {
            // Existing platforms
            'zoom.us': () => {
                meetingInfo.platform = 'Zoom';
                const pathParts = url.pathname.split('/');
                const jIndex = pathParts.indexOf('j');
                if (jIndex !== -1 && pathParts[jIndex + 1]) {
                    meetingInfo.meetingId = pathParts[jIndex + 1];
                }
                meetingInfo.password = url.searchParams.get('pwd') || '';
            },

            'teams.microsoft.com': () => {
                meetingInfo.platform = 'Microsoft Teams';
                const meetingIdMatch = url.pathname.match(/\/([a-zA-Z0-9_-]{12,})/);
                if (meetingIdMatch) meetingInfo.meetingId = meetingIdMatch[1];
            },

            'meet.google.com': () => {
                meetingInfo.platform = 'Google Meet';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'webex.com': () => {
                meetingInfo.platform = 'Cisco Webex';
                const meetingMatch = url.pathname.match(/\/(\d{9,11})/);
                if (meetingMatch) meetingInfo.meetingId = meetingMatch[1];
            },

            'cal.com': () => {
                meetingInfo.platform = 'Cal.com';
                const pathParts = url.pathname.split('/').filter(Boolean);
                if (pathParts.length >= 2) {
                    meetingInfo.host = pathParts[0];
                    meetingInfo.meetingId = pathParts[1];
                }
            },

            // New platforms
            'bluejeans.com': () => {
                meetingInfo.platform = 'BlueJeans';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'gotomeeting.com': () => {
                meetingInfo.platform = 'GoToMeeting';
                meetingInfo.meetingId = url.pathname.match(/\/(\d{9})/)?.[1] || '';
            },

            'join.me': () => {
                meetingInfo.platform = 'Join.me';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'whereby.com': () => {
                meetingInfo.platform = 'Whereby';
                meetingInfo.host = url.pathname.split('/')[1];
                meetingInfo.joinUrl = link;
            },

            'meet.jit.si': () => {
                meetingInfo.platform = 'Jitsi Meet';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'chime.aws': () => {
                meetingInfo.platform = 'Amazon Chime';
                meetingInfo.meetingId = url.searchParams.get('meeting_ID');
            },

            'meet.starleaf.com': () => {
                meetingInfo.platform = 'StarLeaf';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'lifesize.com': () => {
                meetingInfo.platform = 'Lifesize';
                meetingInfo.meetingId = url.pathname.match(/\/(\w+)$/)?.[1] || '';
            },

            'meet.ringcentral.com': () => {
                meetingInfo.platform = 'RingCentral';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            '8x8.vc': () => {
                meetingInfo.platform = '8x8 Meet';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'meet.goto.com': () => {
                meetingInfo.platform = 'GoTo Meeting';
                meetingInfo.meetingId = url.pathname.match(/\/(\d{9})/)?.[1] || '';
            },

            'vonage.com': () => {
                meetingInfo.platform = 'Vonage Meetings';
                meetingInfo.meetingId = url.searchParams.get('meeting_id');
            },

            'meet.lync.com': () => {
                meetingInfo.platform = 'Skype for Business';
                meetingInfo.meetingId = url.searchParams.get('conference_id');
            },

            'meetingsemea.lync.com': () => {
                meetingInfo.platform = 'Skype for Business (EMEA)';
                meetingInfo.meetingId = url.searchParams.get('conference_id');
            },

            'uberconference.com': () => {
                meetingInfo.platform = 'UberConference';
                meetingInfo.host = url.pathname.split('/')[1];
            },

            'meet.google.com/lookup': () => {
                meetingInfo.platform = 'Google Meet (Education)';
                meetingInfo.meetingId = url.pathname.split('/lookup/').pop();
            },

            'duo.google.com': () => {
                meetingInfo.platform = 'Google Duo';
                meetingInfo.meetingId = url.searchParams.get('call_id');
            },

            'facetime.apple.com': () => {
                meetingInfo.platform = 'FaceTime';
                meetingInfo.meetingId = url.searchParams.get('call_id');
            },

            'teams.live.com': () => {
                meetingInfo.platform = 'Microsoft Teams Live';
                meetingInfo.meetingId = url.searchParams.get('event_id');
            },

            'skype.com': () => {
                meetingInfo.platform = 'Skype';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'meet.anydesk.com': () => {
                meetingInfo.platform = 'AnyDesk Meeting';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'meet.teamviewer.com': () => {
                meetingInfo.platform = 'TeamViewer Meeting';
                meetingInfo.meetingId = url.searchParams.get('meeting_id');
            },

            'discord.com': () => {
                meetingInfo.platform = 'Discord';
                const parts = url.pathname.split('/');
                meetingInfo.meetingId = parts[parts.length - 1];
            },

            'slack.com': () => {
                meetingInfo.platform = 'Slack Huddle';
                meetingInfo.meetingId = url.searchParams.get('thread_ts');
            },

            'meet.zoho.com': () => {
                meetingInfo.platform = 'Zoho Meeting';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'bigbluebutton.org': () => {
                meetingInfo.platform = 'BigBlueButton';
                meetingInfo.meetingId = url.searchParams.get('meeting_id');
            },

            'meet.jio.com': () => {
                meetingInfo.platform = 'JioMeet';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'meet.google.com/native': () => {
                meetingInfo.platform = 'Google Meet (PWA)';
                meetingInfo.meetingId = url.searchParams.get('meeting_code');
            },

            'livestorm.co': () => {
                meetingInfo.platform = 'Livestorm';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'demio.com': () => {
                meetingInfo.platform = 'Demio';
                meetingInfo.meetingId = url.pathname.split('/').pop();
            },

            'meetfox.com': () => {
                meetingInfo.platform = 'MeetFox';
                meetingInfo.host = url.pathname.split('/')[1];
                meetingInfo.meetingId = url.pathname.split('/')[2];
            }
        };

        // Find and execute the appropriate parser
        const platformKey = Object.keys(platformParsers).find(key => hostname.includes(key));
        if (platformKey) {
            platformParsers[platformKey]();

            // Common parameters that might be present in any platform
            const timeParams = [
                url.searchParams.get('time'),
                url.searchParams.get('startTime'),
                url.searchParams.get('start_time'),
                url.searchParams.get('date')
            ].filter(Boolean);

            if (timeParams.length > 0) {
                const parsedTime = parseTime(timeParams[0]);
                if (parsedTime) {
                    meetingInfo.time = parsedTime.time;
                    meetingInfo.date = parsedTime.date;
                }
            }

            const durationParams = [
                url.searchParams.get('duration'),
                url.searchParams.get('dur'),
                url.searchParams.get('length')
            ].find(Boolean);

            if (durationParams) {
                meetingInfo.duration = `${durationParams} minutes`;
            }
        } else {
            throw new Error('Unsupported meeting platform');
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
        duration: document.getElementById('meeting-duration'),
        host: document.getElementById('meeting-host')
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
