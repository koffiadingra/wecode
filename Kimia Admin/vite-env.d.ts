interface ImportMetaEnv {
  readonly VITE_APP_APPWRITE_URL: string;
  readonly VITE_APP_APPWRITE_PROJET_ID: string;
  readonly VITE_APP_APPWRITE_DATABASE_ID: string;
  readonly VITE_APP_APPWRITE_COLLECTION_ID: string;
  readonly VITE_APP_APPWRITE_BUCKET_ID: string;
  readonly VITE_APPWRITE_PROJECT_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
