import { rename } from './handlerProcess/rename'
import transformObjects from './handlerProcess/transformObjects'
import transformPaths from './handlerProcess/transformPaths'

export const handlerProcess = async () => {
  const paths = transformPaths()
  const objects = transformObjects(paths)
  for (const object of objects) {
    await rename(object)
  }
  console.log('End')
}

export default handlerProcess
