import main from './index'
import targetPath from './utils/targetPath'

targetPath.set(process.argv[2] || '')
main()
