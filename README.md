# Meeting Time Manager

A modern, responsive web application for managing meeting times across different time zones and parsing meeting links from various platforms.

![Meeting Time Manager](screenshots/preview.png)

## 🌟 Features

### 🕒 Time Management
- Real-time clock display
- Multiple time zone support
- Local and host time synchronization
- Support for 40+ international time zones

### ⚡ Meeting Link Parser
Supports parsing meeting links from major platforms:

#### Zoom
- Meeting IDs and passwords
- Scheduled meeting times
- Meeting duration
- Support for regular meetings and webinars

#### Google Meet
- Meeting codes
- Scheduled times
- Custom meeting links

#### Microsoft Teams
- Meeting IDs
- Start times and duration
- Direct meeting links

#### Cisco Webex
- Meeting numbers
- Passwords
- Scheduled times and duration

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
git clone https://github.com/yourusername/meeting-time-manager.git
```

2. Navigate to the project directory:
```bash
cd meeting-time-manager
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
meeting-time-manager/
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

## 📈 Future Enhancements
- Calendar integration
- Meeting scheduling
- Notification system
- More meeting platforms support
- Custom themes
- Meeting history tracking

---
Made with ❤️ by [Your Name]
