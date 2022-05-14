// import { useRef, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import octocat from '../octocat.png';

// import { useAuth } from "../contexts/AuthProvider.js";

// export default function Login() {
//   const [loading, setLoading] = useState(false);

//   const { signInWithGitHub } = useAuth();

//   const handleGitHubLogin = async () => {
//     try {
//       setLoading(true);
//       const { error } = await signInWithGitHub();
//       if (error) throw error;
//     } catch (error) {
//       alert(error.error_description || error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
    
//   );
// }
