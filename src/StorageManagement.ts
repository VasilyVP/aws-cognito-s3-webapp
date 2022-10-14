import { Storage } from '@aws-amplify/storage'

type StorageListOptions = {
    level?: 'private' | 'protected' | 'public';
    maxKeys?: number;
}

type StoragePutOptions = {
    level?: 'private' | 'protected' | 'public';
    contentType?: string;
}

export default class StorageManagement {
    static list(path = '', options?: StorageListOptions) {
        return Storage.list(path, options)
    }

    static async putObject(file: File, options?: StoragePutOptions) {
        try {
            return await Storage.put(file.name, file, options);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
