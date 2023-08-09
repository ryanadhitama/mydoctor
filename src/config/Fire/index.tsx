import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDY1LD3sQCpyHRhL9nxLJ5Wy6M9kXVQwcQ',
  authDomain: 'mydoctor-5d3bb.firebaseapp.com',
  databaseURL: 'https://mydoctor-5d3bb-default-rtdb.firebaseio.com',
  projectId: 'mydoctor-5d3bb',
  storageBucket: 'mydoctor-5d3bb.appspot.com',
  messagingSenderId: '982743034587',
  appId: '1:982743034587:web:0a5136f148a1e190223afe',
  measurementId: 'G-FK69TTZ0JT'
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app, 'gs://mydoctor-5d3bb.appspot.com');
export const auth = getAuth(app);

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  StorageError,
  StorageErrorCode
} from 'firebase/storage';

export enum UploadFolder {
  'USER' = 'user/'
}

export const uploadFile = async (
  uri: string,
  folder: UploadFolder,
  replacePath?: string | null,
  customName?: string
) => {
  try {
    const now = new Date();
    const filename = customName || now.getTime();

    const fileRef = ref(storage, replacePath || `${folder}${filename}.${uri.split('.').pop()}`);

    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const res = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const fullPath = res.metadata.fullPath;
    const url = await getDownloadURL(fileRef);

    return { fullPath, url };
  } catch (error) {
    throw error;
  }
};

/** Public and long-lived, but hard to guess firebase storage url */
export const getFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return deleteObject(fileRef);
  } catch (error) {
    /** Skip error if file to delete is not found */
    if (error instanceof StorageError && error.code !== StorageErrorCode.OBJECT_NOT_FOUND) {
      throw error;
    }
  }
};
