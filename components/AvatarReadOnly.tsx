import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUploadButton?: boolean; // Nueva propiedad para controlar el botón de subida
}

export default function AvatarReadOnly({
  url,
  size = 150,
  onUpload,
  showUploadButton = true,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        throw new Error("No image uri!");
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }
  // Función para abrir el modal con la imagen ampliada
  const handleImagePress = () => {
    if (avatarUrl) {
      setShowImageModal(true); // Mostrar la imagen en grande
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowImageModal(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress} disabled={uploading}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
          />
        ) : (
          <Image
            source={require("../assets/userplaceholder.jpg")}
            style={[avatarSize, styles.placeholderImage]}
            accessibilityLabel="Default Avatar"
          />
        )}
        {
          uploading && <ActivityIndicator size="large" color="#0000ff" /> // Spinner de carga
        }
      </TouchableOpacity>
      {/* Modal para mostrar la imagen en grande */}
      {avatarUrl && (
        <Modal
          visible={showImageModal}
          animationType="fade"
          transparent={true}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={styles.modalClose}>
              <Image
                source={{ uri: avatarUrl }} // Asegúrate de pasar undefined si avatarUrl es null
                style={styles.modalImage}
                accessibilityLabel="Imagen ampliada"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 10,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  placeholderImage: {
    resizeMode: "contain",
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalClose: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalImage: {
    width: 300, // Tamaño de la imagen ampliada
    height: 300, // Tamaño de la imagen ampliada
    borderRadius: 10,
    resizeMode: "contain",
  },
});
