import main from './index'
import displayBanner from './processes/displayBanner'
import helpProcess from './processes/helpProcess'
import versionProcess from './processes/versionProcess'
import { getCliParams } from './utils/getCliParams'

const params = getCliParams()
if (params.version) {
  versionProcess()
} else if (params.help) {
  helpProcess()
} else {
  displayBanner()
  main()
}
