import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFurFMGYwqcMN6OwuJWaFrseOpTwyFfh4",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "...",
//   appId: "..."
// };

const firebaseConfig = {
  apiKey: "AIzaSyAFurFMGYwqcMN6OwuJWaFrseOpTwyFfh4",
  authDomain: "sun-squad-solar.firebaseapp.com",
  projectId: "sun-squad-solar",
  storageBucket: "sun-squad-solar.firebasestorage.app",
  messagingSenderId: "946989543717",
  appId: "1:946989543717:web:27bbd830348a9d47542acc",
  measurementId: "G-BH2NXL478R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance to be used in other components
export const auth = getAuth(app);

