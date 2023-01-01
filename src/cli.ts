import main from './index'
import displayBanner from './processes/displayBanner'
import helpProcess from './processes/helpProcess'
import { getCliParams } from './utils/getCliParams'

displayBanner()

const params = getCliParams()
if (params.help) {
  helpProcess()
} else {
  main()
}
