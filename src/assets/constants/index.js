// Immover profiles
export const IDENTITY_TYPES = [
  {label: 'Agence immobilière agrée', key: 'Agence immobilière agrée'},
  {label: 'Agence immobilière non agrée', key: 'Agence immobilière non agrée'},
  {label: 'Promoteur immobilier', key: 'Promoteur immobilier'},
  {label: 'Aménageur foncier', key: 'Aménageur foncier'},
  {label: 'Propriétaire', key: 'Propriétaire'},
  {label: 'Constructeur BTP', key: 'Constructeur BTP'},
];

// Identity types
export const IMMOVER_PROFILES = [
  {label: 'Agence immobilière agrée', key: 'agence'},
  {label: 'Agence immobilière non agrée', key: 'non agree'},
];

export const WELL_OPTIONS = [
  {label: 'Validation en cours', key: 'new'},
  {label: 'Disponibles', key: 'dispo'},
  {label: 'Indisponibles', key: 'indispo'},
  // {label: 'Sponsorisés', key: 'pub'},
];

// Appointments Options
export const APPOINTMENTS_OPTIONS = [
  {label: 'En cours', key: 'waiting'},
  {label: 'Reportées', key: 'reportes'},
  {label: 'Annulées', key: 'annule'},
  {label: 'Effectuée', key: 'effectue'},
  {label: 'Soldée', key: 'solde'},
];

export const phoneRegex =
  /^(\d{0,0})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
