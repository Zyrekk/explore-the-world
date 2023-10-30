import {ref, uploadBytes} from "firebase/storage";
import {FIREBASE_STORAGE} from "../../../FirebaseConfig";

export const uploadImage = async (image: any) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 28);
    const imageRef = ref(FIREBASE_STORAGE, filename);
    if (blob) {
        await uploadBytes(imageRef, blob)
    }
    return filename;
};
