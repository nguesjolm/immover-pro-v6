// utils/videoCompressor.ts - Version moderne Expo SDK 54
import { File, Directory, Paths, FileInfo } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

interface VideoCompressionOptions {
  maxSizeMB?: number;
}

interface CompressedVideo {
  uri: string;
  name: string;
  type: string;
  originalSize?: number;
  compressedSize: number;
  sizeReduced: boolean;
  thumbnailUri?: string;
  duration?: number;
}

/**
 * ✅ Compresse la vidéo - Version moderne Expo SDK 54
 * Vérifie la taille et retourne les métadonnées
 */
export const compressVideo = async (
  videoUri: string,
  options: VideoCompressionOptions = {}
): Promise<CompressedVideo | null> => {
  const { maxSizeMB = 10 } = options;

  try {
    console.log("🎬 [Expo SDK 54] Analyse de la vidéo...");
    
    // ✅ Nouvelle API : Utiliser la classe File
    const file = new File(videoUri);
    
    // Vérifier que le fichier existe
    if (!file.exists) {
      console.log("❌ Fichier vidéo introuvable");
      return null;
    }
    
    // ✅ Accès direct à la taille
    const originalSize = file.size || 0;
    const originalSizeMB = originalSize / (1024 * 1024);
    
    console.log(`📹 Taille: ${originalSizeMB.toFixed(2)} MB`);
    console.log(`📹 Nom: ${file.name}`);
    console.log(`📹 Type: ${file.type}`);
    
    // Vérifier si la vidéo est déjà assez petite
    if (originalSizeMB <= maxSizeMB && originalSizeMB > 0) {
      console.log("✅ Vidéo déjà optimisée");
      return {
        uri: videoUri,
        name: file.name || `video_${Date.now()}.mp4`,
        type: 'video/mp4',
        originalSize,
        compressedSize: originalSize,
        sizeReduced: false,
        thumbnailUri: undefined,
      };
    }
    
    // Vérifier si la vidéo ne dépasse pas la limite du serveur (50MB)
    if (originalSizeMB > 50) {
      console.log(`❌ Vidéo trop volumineuse: ${originalSizeMB.toFixed(2)} MB > 50 MB`);
      return null;
    }
    
    // La compression automatique sans UI n'est pas possible dans Expo Go
    // La compression se fait via ImagePicker avec allowsEditing: true
    console.log("⚠️ Compression automatique non supportée");
    console.log("💡 Utilisez ImagePicker avec allowsEditing et quality pour compresser");
    
    return {
      uri: videoUri,
      name: file.name || `video_${Date.now()}.mp4`,
      type: 'video/mp4',
      originalSize,
      compressedSize: originalSize,
      sizeReduced: false,
      thumbnailUri: undefined,
    };
    
  } catch (error) {
    console.error("❌ Erreur analyse vidéo:", error);
    return null;
  }
};

/**
 * ✅ Compression via ImagePicker avec interaction utilisateur
 * À appeler depuis le composant React
 */
export const compressVideoWithPicker = async (): Promise<CompressedVideo | null> => {
  try {
    console.log("🔄 Ouverture du sélecteur vidéo avec compression...");
    
    // Demander la permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permission.granted) {
      console.log("❌ Permission refusée");
      return null;
    }
    
    // ✅ Nouvelle API : Utiliser ['videos'] au lieu de MediaTypeOptions.Videos
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 0.5,
      videoMaxDuration: 60,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    });
    
    if (!result.canceled && result.assets[0]) {
      const compressedUri = result.assets[0].uri;
      const duration = result.assets[0].duration || 0;
      
      // ✅ Vérifier la taille avec la nouvelle API File
      const file = new File(compressedUri);
      const compressedSize = file.size || 0;
      const compressedSizeMB = compressedSize / (1024 * 1024);
      
      console.log("✅ Vidéo sélectionnée et compressée");
      console.log(`📊 Taille: ${compressedSizeMB.toFixed(2)} MB`);
      console.log(`📊 Durée: ${duration ? Math.round(duration / 1000) + 's' : 'Inconnue'}`);
      
      // Vérifier si la taille est acceptable
      if (compressedSizeMB > 50) {
        console.log(`❌ Vidéo trop volumineuse après compression: ${compressedSizeMB.toFixed(2)} MB`);
        return null;
      }
      
      return {
        uri: compressedUri,
        name: file.name || `compressed_${Date.now()}.mp4`,
        type: 'video/mp4',
        compressedSize,
        sizeReduced: true,
        thumbnailUri: undefined,
        duration,
      };
    }
    
    console.log("❌ Sélection annulée");
    return null;
    
  } catch (error) {
    console.error("❌ Erreur lors de la sélection:", error);
    return null;
  }
};

/**
 * ✅ Nettoyage des fichiers temporaires avec la nouvelle API
 */
export const cleanupCompressedVideo = async (uri: string) => {
  try {
    if (!uri) return;
    
    // Vérifier si c'est un fichier temporaire
    if (uri.includes('cache') || uri.includes('compressed') || uri.includes('tmp')) {
      const file = new File(uri);
      
      if (file.exists) {
        file.delete();
        console.log("🗑️ Fichier temporaire supprimé:", uri);
      }
    }
  } catch (error) {
    console.error("Erreur lors du nettoyage:", error);
  }
};

/**
 * ✅ Nettoyage de tous les fichiers compressés dans le cache
 */
export const cleanupAllCompressedVideos = async () => {
  try {
    const cacheDir = new Directory(Paths.cache);
    
    if (cacheDir.exists) {
      const contents = cacheDir.list();
      
      for (const item of contents) {
        if (item instanceof File && (
          item.name.includes('compressed_') || 
          item.name.includes('video_')
        )) {
          item.delete();
          console.log("🗑️ Supprimé:", item.name);
        }
      }
      
      console.log("✅ Nettoyage du cache terminé");
    }
  } catch (error) {
    console.error("Erreur nettoyage cache:", error);
  }
};

/**
 * ✅ Métadonnées de la vidéo avec la nouvelle API
 */
export const getVideoMetadata = async (videoUri: string) => {
  try {
    // ✅ Utiliser la classe File moderne
    const file = new File(videoUri);
    
    if (!file.exists) {
      return {
        size: 0,
        sizeMB: '0.00',
        exists: false,
        uri: videoUri,
      };
    }
    
    // ✅ Accès direct aux propriétés (plus besoin de @ts-ignore)
    const size = file.size || 0;
    const sizeMB = (size / (1024 * 1024)).toFixed(2);
    
    console.log("📋 Métadonnées vidéo:");
    console.log(`   Nom: ${file.name}`);
    console.log(`   Taille: ${sizeMB} MB`);
    console.log(`   Type: ${file.type}`);
    console.log(`   Extension: ${file.extension}`);
    
    return {
      size,
      sizeMB,
      exists: true,
      uri: videoUri,
      name: file.name,
      type: file.type,
      extension: file.extension,
      modificationTime: file.modificationTime,
      md5: file.md5,
    };
  } catch (error) {
    console.error("❌ Erreur métadonnées:", error);
    return null;
  }
};

/**
 * ✅ Obtenir la taille d'un fichier rapidement
 */
export const getFileSize = (uri: string): number => {
  try {
    const file = new File(uri);
    return file.exists ? (file.size || 0) : 0;
  } catch (error) {
    console.error("Erreur lecture taille:", error);
    return 0;
  }
};

/**
 * ✅ Vérifier si le fichier existe
 */
export const fileExists = (uri: string): boolean => {
  try {
    const file = new File(uri);
    return file.exists;
  } catch (error) {
    return false;
  }
};

/**
 * ✅ Formater la taille en unités lisibles
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * ✅ Vérifier si la taille est valide pour l'upload
 */
export const isValidVideoSize = (uri: string, maxSizeMB: number = 50): boolean => {
  try {
    const file = new File(uri);
    if (!file.exists) return false;
    
    const sizeMB = (file.size || 0) / (1024 * 1024);
    return sizeMB <= maxSizeMB;
  } catch (error) {
    console.error("Erreur validation taille:", error);
    return false;
  }
};