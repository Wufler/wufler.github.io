import { db } from './pool'

export async function getProjects() {
    const data = await db.query('SELECT * FROM projects')
    return data.rows
}