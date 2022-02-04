import client from '../../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  username: string,
  password: string
};
type UserDB = {
  id: number,
  username: string,
  password_digest: string
}

export class UserStore {
  async create(u: User): Promise<UserDB | undefined> {
    try {
      if (client) {
        const conn = await client.connect()
        const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
  
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(saltRounds as string)
        );
  
        const result = await conn.query(sql, [u.username, hash])
        const user: UserDB = result.rows[0]
  
        conn.release()
  
        return user
      } else { 
        return undefined
      }
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    } 
  }

  async authenticate(username: string, password: string): Promise<UserDB | null> {
    if (client) { 
      const conn = await client.connect()
      const sql = 'SELECT password_digest FROM users WHERE username=($1)'
  
      const result = await conn.query(sql, [username])
  
      console.log(password+pepper)
  
      if(result.rows.length) {
  
        const user: UserDB = result.rows[0]
  
        console.log(user)
  
        if (bcrypt.compareSync(password+pepper, user.password_digest)) {
          return user
        }
      }
    }
    return null
  }
}
