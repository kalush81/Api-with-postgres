import dotenv from 'dotenv'
import { UserStore } from '../models/user/user.model'

dotenv.config();

console.log('NODE_ENV', process.env.ENV);

const user = new UserStore()

describe('test UserStore', () => {
  it('creates an user', async () => { 
    const testUser = {username: 'Kris', password: '1234'}
    const newUser = await user.create(testUser)
    expect(newUser?.username).toBe('Kris')
  })
})
