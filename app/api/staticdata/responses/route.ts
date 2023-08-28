import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

const GET = async () => {
  const jsonDirectory = path.join(process.cwd(), 'json')
  const data = await fs.readFile(jsonDirectory + '/responses.json', 'utf8')
  return NextResponse.json(data)
}

export { GET }
