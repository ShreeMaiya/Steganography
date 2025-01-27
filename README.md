# Steganography Web App

A modern web application for hiding secret messages within files using steganography techniques.


## 🌟 Features

- Hide messages in various file types (images, audio, video)
- Secure encryption with password protection
- Cross-platform compatibility
- Real-time message encoding and decoding
- Modern, responsive user interface
- Support for multiple file formats

## 🚀 Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Steganography.git
cd Steganography
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔐 Usage

### Encoding a Message
1. Select "Encode" mode
2. Choose your file type (image/audio/video)
3. Upload the file you want to use
4. Enter your secret message
5. Set a password 
6. Click "Encode & Download"

### Decoding a Message
1. Select "Decode" mode
2. Upload the encoded file
3. Enter the password used for encoding
4. Click "Decode Message"

## 🛡️ Security

- Messages are encrypted using XOR cipher
- Password hashing ensures secure message retrieval
- No server storage - all processing happens locally

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## ✨ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

