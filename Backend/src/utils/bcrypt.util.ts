import bcrypt from 'bcrypt'


export  async function hashPassword(password:string):Promise<string>{
    const salt = 10
    return await bcrypt.hash(password,salt)
}

export async function comparePassword(password:string,hashPassword:string):Promise<boolean>{
    return await bcrypt.compare(password,hashPassword)
}

