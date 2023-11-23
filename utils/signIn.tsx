import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserInterface } from "@/constants/UserInterface";
import { saveUserToStorage } from "@/utils/saveUserToStorage";
import { useRouter } from "expo-router";

export const signIn = async (
  email: string,
  password: string,
  setLoading: (loading: boolean) => void,
  router: any
) => {
  const auth = FIREBASE_AUTH;
  setLoading(true);
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)

    const userDocRef = doc(FIREBASE_DB, "Users", response.user.uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      if(!response.user.emailVerified){
          alert("Please verify your email")
          return
      }
      if (userData) {
        const fetchedUser: UserInterface = {
          uid: response.user.uid,
          email: userData?.email,
          nickname: userData?.nickname,
          name: userData?.name,
          lastname: userData?.lastname,
          avatar: userData?.avatar,
          country: userData?.country,
          favoritePlaces: userData?.favoritePlaces,
        };
        await saveUserToStorage(JSON.stringify(fetchedUser));
        router.replace("/home");
      } else {
        alert("User email not found");
      }
    } else {
      alert("User data not found in Firestore");
    }
  } catch (error) {
    alert("Sign in failed");
  } finally {
    setLoading(false);
  }
};
