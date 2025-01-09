# Freelancer Time Hub

A modern, responsive web application for managing meeting times across different time zones and parsing meeting links from various platforms.

![Meeting Time Manager](screenshots/preview.png)

## 🌟 Features

### 🕒 Time Management
- Real-time clock display
- Multiple time zone support
- Local and host time synchronization
- Support for 40+ international time zones

### ⚡ Meeting Link Parser
Supports parsing meeting links from 35+ platforms:

#### Enterprise Solutions
- Zoom (Regular, Webinar, Scheduled)
- Microsoft Teams (Regular, Live Events)
- Cisco Webex
- BlueJeans
- GoToMeeting
- RingCentral
- 8x8 Meet
- Lifesize
- StarLeaf
- Amazon Chime

#### Web-Based Solutions
- Google Meet (Regular, Education, PWA)
- Jitsi Meet
- Whereby
- Join.me
- UberConference
- Livestorm
- Demio
- MeetFox
- BigBlueButton
- Zoho Meeting

#### Business Communication
- Skype (Regular, Business)
- Skype for Business EMEA
- Slack Huddle
- Discord
- Microsoft Teams Live

#### Mobile & Desktop
- Google Duo
- FaceTime
- AnyDesk Meeting
- TeamViewer Meeting
- JioMeet

#### Scheduling Platforms
- Cal.com
- Vonage Meetings
- MeetFox

Example Links:
```
Enterprise:
- https://zoom.us/j/1234567890?pwd=abc123
- https://teams.microsoft.com/l/meetup-join/...
- https://company.webex.com/meet/123456789
- https://bluejeans.com/123456789
- https://global.gotomeeting.com/join/123456789

Web-Based:
- https://meet.google.com/abc-defg-hij
- https://meet.jit.si/RoomName
- https://whereby.com/roomname
- https://join.me/123-456-789
- https://uberconference.com/roomname

Mobile & Desktop:
- https://duo.google.com/call?id=123456789
- facetime.apple.com/join?id=123456789
- https://meet.anydesk.com/123456789
- https://meet.teamviewer.com/123456789

Scheduling:
- https://cal.com/username/15min
- https://meetfox.com/username/service
```

### ⏱️ Timer Functions
- Start/Stop/Pause functionality
- Reset option
- Visual countdown
- Mobile-friendly controls

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/freelancer-time-hub.git
```

2. Navigate to the project directory:
```bash
cd freelancer-time-hub
```

3. Open `index.html` in your web browser

## 📖 Usage

### Time Zone Selection
1. Use the dropdown menu to select your desired time zone
2. The display will automatically update to show both local and selected time zone

### Meeting Link Parsing
1. Copy your meeting link from any supported platform
2. Paste it into the "Meeting Link" input field
3. Click "Parse" or press Enter
4. View the extracted meeting details:
   - Platform
   - Host (for Cal.com)
   - Meeting ID
   - Password (if available)
   - Meeting Time
   - Date
   - Duration

### Timer Usage
1. Click "Start" to begin the timer
2. Use "Pause" to temporarily stop
3. "Stop" to end the current session
4. "Reset" to clear the timer

## 🎨 Customization

### Color Scheme
The application uses CSS variables for easy customization:
```css
:root {
    --powder-blue: #0ebdd4;
    --light-powder-blue: #C5E7EC;
    --dark-powder-blue: #89B9C0;
    --accent-blue: #7BA7AF;
    --text-color: #333;
    --background-color: #f5f5f5;
}
```

### Supported Time Zones
Add or remove time zones in the `country-selector` dropdown in `index.html`.

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints at 480px, 768px, and 1024px
- Optimized for all screen sizes
- Touch-friendly interface

## 🔧 Technical Details

### File Structure
```
freelancer-time-hub/
├── index.html
├── styles.css
├── script.js
├── README.md
└── screenshots/
    └── preview.png
```

### Technologies Used
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer Contact
- Email: Digitalcivitas855@gmail.com
- WhatsApp: +2348131017099

## 🙏 Acknowledgments
- Font Awesome for icons
- Time zone data from IANA Time Zone Database
- Meeting link parsing inspired by various platform APIs
- Cal.com for scheduling integration

## 📈 Future Enhancements
- Calendar integration
- Meeting scheduling
- Notification system
- More meeting platforms support
- Custom themes
- Meeting history tracking
- Direct Cal.com calendar integration
- Bulk meeting link processing
- Meeting reminder system
- Export meeting details to calendar

---
Made with ❤️ by Habeeb Oluwafemi (DigitalCivitas) Copyright © 2025
