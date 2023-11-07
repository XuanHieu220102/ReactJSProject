

const fakeAuthProvider = {
    isAuthenticaed: false,
    signin(callback) {
        fakeAuthProvider.isAuthenticaed = true;
        setTimeout(callback, 100);
    },

    signout(callback) {
        fakeAuthProvider.isAuthenticaed = false;
        setTimeout(callback, 100)
    },
}

export {fakeAuthProvider}