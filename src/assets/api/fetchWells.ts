import axios from "axios";
import { BASE_URI } from "./app.config";
import { helperHeaderConfig } from "../utils/helperHeader";

// Fetch Wells
export const fetchWells = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getAllBiensOffreur`, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well by id

// Fetch Well categories
export const fetchWellCategories = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/listecategories`, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well proposals by request id
export const fetchWellProposals = async (
  demande_id: number | string | null
) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(`${BASE_URI}/getOffreurBienOnDemand`, { demande_id }, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well operations
export const fetchWellOperations = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/listeoperations`, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well types
export const fetchWellTypes = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/listecategories`, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well cities
export const fetchWellCities = async () => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/listevilles`, { headers })
    .catch((error) => error.response);
  return response;
};

// Fetch Well states by city id
export const fetchWellStates = async (id: number | string | null) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/communebyville/${id}`, { headers })
    .catch((error) => error.response);
  return response;
};

// Add Well
/*export const addWell = async (formData: any) => {
  const headers = await helperHeaderConfig(true);

  const res = await fetch(`${BASE_URI}/addBiensOffreur`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...headers,
    },
    body: formData,
  });

  const response = await res.json();
  return response;
};*/

// Add Well - Version React Native Expo
/*
export const addWell = async (formData: any) => {
  try {
    const headers = await helperHeaderConfig(true);
    
    console.log("📤 Envoi à l'API:", `${BASE_URI}/addBiensOffreur`);
    
    // ✅ En React Native, on n'ajoute PAS Content-Type manuellement
    const response = await fetch(`${BASE_URI}/addBiensOffreur`, {
      method: 'POST',
      headers: headers, // Sans Content-Type
      body: formData,
    });
    
    console.log("📥 Status:", response.status);
    
    const data = await response.json();
    console.log("📥 Réponse:", data);
    
    return data;
  } catch (error) {
    console.error("❌ Erreur addWell:", error);
    return { 
      statuscode: 500, 
      message: "Erreur de connexion au serveur",
      error: error 
    };
  }
};
*/

// Add Well - Version avec axios
export const addWell = async (data : any) => {
  const headers = await helperHeaderConfig(true);
  try {
    const response = await axios.post(`${BASE_URI}/addBiensOffreur`, data, {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        //   'multipart/form-data; boundary=<calculated when request is sent>',
        // 'Content-Type': 'multipart/form-data',
        ...headers,
      },
      timeout: 60000, // ⏱️ 60 secondes (au lieu de 10 secondes par défaut)
      maxContentLength: Infinity, // Pas de limite de taille
      maxBodyLength: Infinity,    // Pas de limite de taille
    });

    return response;
  } catch (error) {
    return error;
  }
};


// Update Well status
export const updateWellStatus = async (
  id: number | string | null,
  statut: string
) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .post(
      `${BASE_URI}/updateBiensOffreurStatus`,
      { biens_id: id, statut },
      { headers }
    )
    .catch((error) => error.response);
  return response;
};

// Well by id
export const fetchWellById = async (id: number | string | null) => {
  const headers = await helperHeaderConfig();
  const response = await axios
    .get(`${BASE_URI}/getOffreurBienId/${id}`, { headers })
    .catch((error) => error.response);
  return response;
};
