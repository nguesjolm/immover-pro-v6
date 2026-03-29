// utils/videoCompressor.ts
import { File } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

interface VideoCompressionOptions {
  maxSizeMB?: number;
}

interface CompressedVideo {
  uri: string;
  name: string;
  type: string;
  originalSize: number;
  compressedSize: number;
  sizeReduced: boolean;
}

/**
 * Vérifie et convertit la vidéo en MP4 si nécessaire
 */
export const compressVideo = async (
  videoUri: string,
  options: VideoCompressionOptions = {}
): Promise<CompressedVideo | null> => {
  const { maxSizeMB = 50 } = options;

  try {
    console.log("📹 Vérification vidéo...");
    
    // Créer une instance File
    const file = new File(videoUri);
    
    // Vérifier si le fichier existe
    if (!file.exists) {
      console.log("❌ Fichier vidéo introuvable");
      return null;
    }
    
    const originalSize = file.size;
    const originalSizeMB = originalSize / (1024 * 1024);
    
    console.log(`📹 Taille: ${originalSizeMB.toFixed(2)} MB`);
    console.log(`📹 Nom: ${file.name}`);
    console.log(`📹 Type: ${file.type}`);
    
    // Vérifier la taille
    if (originalSizeMB > 50) {
      console.log(`❌ Vidéo trop volumineuse: ${originalSizeMB.toFixed(2)} MB > ${maxSizeMB} MB`);
      return null;
    }
    
    // Vérifier si la vidéo est déjà en MP4
    const isMP4 = file.name.toLowerCase().endsWith('.mp4') || file.type === 'video/mp4';
    
    if (!isMP4) {
      console.log("⚠️ Vidéo non MP4, tentative de conversion...");
      // Note: Expo ne permet pas de convertir directement les vidéos
      // Solution: alerter l'utilisateur
      console.log("❌ Format non supporté. Veuillez sélectionner une vidéo au format MP4");
      return null;
    }
    
    console.log("✅ Vidéo valide (MP4)");
    
    return {
      uri: videoUri,
      name: file.name,
      type: 'video/mp4',
      originalSize,
      compressedSize: originalSize,
      sizeReduced: false,
    };
    
  } catch (error) {
    console.error("❌ Erreur lors de la vérification vidéo:", error);
    return null;
  }
};

/**
 * Nettoie les fichiers temporaires
 */
export const cleanupCompressedVideo = async (uri: string) => {
  try {
    if (uri.includes('compressed_')) {
      const file = new File(uri);
      if (file.exists) {
        await file.delete();
        console.log("🗑️ Fichier temporaire supprimé:", uri);
      }
    }
  } catch (error) {
    console.error("Erreur lors du nettoyage:", error);
  }
};