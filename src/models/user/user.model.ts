import client from '../../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  username: string,
  password: string
};
type userDB = {
  id: number,
  username: string,
  password_digest: string
}

export class UserStore {
  async create(u: User): Promise<userDB | undefined> {
    try {
      if (client) {
        const conn = await client.connect()
        const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
  
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(saltRounds as string)
        );
  
        const result = await conn.query(sql, [u.username, hash])
        const user: userDB = result.rows[0]
  
        conn.release()
  
        return user
      } else { 
        return undefined
      }
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    } 
  }
  //async delete(id: string): Promise<User | undefined> {
    // try {
    //   if (client) {
    //     const conn = await client.connect();
    //     const sql = 'DELETE FROM books WHERE id=($1)';
    //     const result = await conn.query(sql, [id]);
    //     conn.release();
    //     return result.rows[0];
    //   } else {
    //     return undefined;
    //   }
    // } catch (error) {
    //   throw new Error(`couldn't delete book with id ${id}. Error: ${error}`);
    // }
  //}
  // async show(id: string): Promise<Book | undefined> {
  //   try {
  //     if (client) {
  //       const sql = 'SELECT * FROM books WHERE id=($1)';
  //       const conn = await client.connect();
  //       const result = await conn.query(sql, [id]);
  //       conn.release();
  //       return result.rows[0];
  //     } else {
  //       return undefined;
  //     }
  //   } catch (err) {
  //     throw new Error(`Could not find book ${id}. Error: ${err}`);
  //   }
  // }
}
