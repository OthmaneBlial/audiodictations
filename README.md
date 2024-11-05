# AudioDictations

**AudioDictations** is a Vue.js-based web application designed to enhance your dictation skills through interactive audio exercises. Users can select from various difficulty levels, practice dictation, and track their progress seamlessly.

## Features

- **User Authentication:** Secure login with Google integration.
- **Difficulty Levels:** Choose between Simple, Medium, and Difficult dictation exercises.
- **Audio Playback:** Listen to dictations using the VoiceRSS API.
- **Progress Tracking:** Monitor your performance and improvement over time.
- **Dark Mode:** Toggle between light and dark themes for a personalized experience.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/OthmaneBlial/audiodictations.git
   cd audiodictations
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add your VoiceRSS API key:
     ```
     VITE_VOICERSS_API_KEY=your_api_key_here
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Technologies Used

- **Vue 3:** Frontend framework
- **Pinia:** State management
- **Vue Router:** Routing
- **Axios:** HTTP requests
- **FontAwesome:** Icons
- **Vite:** Build tool

## License

This project is licensed under the [MIT License](LICENSE).

---

Enhance your dictation skills with AudioDictations today!
