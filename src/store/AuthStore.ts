import AsyncStorage from "@react-native-async-storage/async-storage";

const Users = "@app:users";
const Logged = "@app:userLogged";

export async function signUp(name:string, email:string, password:string) {
    try{
        const storedUsers = await AsyncStorage.getItem(Users);
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        if(users.find((u:any) => u.email === email)){
            throw new Error("Usuario já cadastrado");
        }

        const newUser = { name, email, password};
        users.push(newUser);

        await AsyncStorage.setItem(Users, JSON.stringify(users));
        console.log("Usuario cadastrado com sucesso!");

        return newUser;
    }catch(error){
        console.error("Algo deu errado:", error);
        throw error;
    }
}

export async function signIn(email:string, password:string) {
    try{
        const storedUsers = await AsyncStorage.getItem(Users);
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find((u: any) => u.email === email && u.password === password);
        if(!user){
            throw new Error("Usuario não cadastrado ou senha incorreta");
        }

        await AsyncStorage.setItem(Logged, JSON.stringify(user));
        console.log("Login realizado com sucesso!");

        return user;
    }catch(error) {
        console.error("Algo deu errado ao logar:", error)
         throw error;
    }
}

export async function signOut() {
    await AsyncStorage.removeItem(Logged);
}