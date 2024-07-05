const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ? 'https://notez-mgfn.onrender.com/api' : 'http://localhost:5000/api';

// export const NOTES_URL = "http://localhost:5000/api/notes/"
// export const USER_URL = "http://localhost:5000/api/users/"
// export const CLOUD_UPLOAD_URL = "https://api.cloudinary.com/v1_1/da9vcx3og/image/upload"
// export const BG_HOME = "https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&w=7680&h=4320&dpr=1"

export const NOTES_URL = API_BASE_URL+"/notes/"
export const USER_URL = API_BASE_URL+"/users/"
export const CLOUD_UPLOAD_URL = "https://api.cloudinary.com/v1_1/da9vcx3og/image/upload"
export const BG_HOME = "https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&w=7680&h=4320&dpr=1"

