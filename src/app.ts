import './aws-config';
import UserManagement from './UserManagement'
import StorageManagement from './StorageManagement';
import { Auth } from '@aws-amplify/auth'
import { Storage } from '@aws-amplify/storage';


const userCredentials = {
    username: 'VasilyVP',
    email: 'vasilyvp@gmail.com',
    password: 'qwerty123A!',
};

/* (async function signUp() {
    const user = await UserManagement.signUp(userCredentials);

    //console.log('user: ', user);

})(); */


/* (async function confirmSignUp() {
    const resp = await UserManagement.confirmSignUp({
        username: 'VasilyVP',
        code: '220767',
    });

    console.log('resp: ', resp);
})(); */

async function signIn() {
    const { username, password } = userCredentials;

    return await UserManagement.signIn({
        username,
        password,
    });

    //console.log('user: ', userResponse);
}

async function uploadFile(file?: File) {
    if (!file) return null;

    if (!await UserManagement.getCurrentUser()) {
        await signIn();
    }

    const result = await StorageManagement.putObject(file/* , { level: 'private' } */);

    console.log('result: ', result);

    const list = await StorageManagement.list(''/* , { level: 'private' } */);

    console.log('list: ', list);

}

document.getElementById('file')?.addEventListener('change', async e => {
    const file = (e.target as HTMLInputElement).files?.[0];

    uploadFile(file);
})
