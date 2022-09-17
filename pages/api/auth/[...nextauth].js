import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "johndoe@test.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                const response = await fetch(
                    "http://localhost:8080/api/auth/signin",
                    {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                //console.log(data)
                // Returning token to set in session
                return {
                    token: data
                };

                // login failed
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                const {token : token2} = user
                console.log(token2)
                return {
                    ...token,
                    ...token2
                };
            }

            return token;
        },

        async session({ session, token }) {
            return {...session,user:token};
        },
    },
    secret: "test",
    jwt: {
        secret: "test",

    },
    pages: {
        signIn: "/login",
    },
});



// export default NextAuth({
//     providers: [
//         CredentialsProvider({
//
//             name: 'my-project',
//
//             credentials: {
//                 username: {
//                     label: 'username',
//                     type: 'text',
//                 },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials, req) {
//                 const payload = {
//                     email: credentials.username,
//                     password: credentials.password,
//                 };
//
//                 const res = await fetch('http://localhost:8080/api/auth/signin', {
//                     method: 'POST',
//                     body: JSON.stringify(payload),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept-Language': 'en-US',
//                     },
//                 });
//
//                 const user = await res.json();
//                 if (!res.ok) {
//                     throw new Error("problem");
//                 }
//                 // If no error and we have user data, return it
//                 if (res.ok && user) {
//                     console.log("user",user)
//                     return user;
//                 }
//
//                 // Return null if user data could not be retrieved
//                 return null;
//             },
//         }),
//         // ...add more providers here
//     ],
//     secret: "jjfdlskjfkls",
//     pages: {
//         signIn: '/login',
//     },
//
//
// });
//
