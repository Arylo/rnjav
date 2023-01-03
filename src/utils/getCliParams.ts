// eslint-disable-next-line @typescript-eslint/naming-convention
const [_base, _process, ...processArgs] = process.argv

const options = {
  params: {
    help: {
      type: Boolean,
      default: false,
    },
    yes: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Boolean,
      default: false,
    },
  },
  aliases: {
    h: 'help',
    y: 'yes',
    v: 'version',
  },
}

const parseBaseParams: ParseBaseParamsFn = (opts) => {
  const paramOptions = Object.entries(opts.params)
  return paramOptions.reduce<any>((o, [k, opt]) => {
    Object.assign(o, { [k]: opt.default })
    return o
  }, {})
}

const parseAppendParams: ParseAppendParamsFn = (opts, baseObj) => {
  const aliasOptions = Object.entries(opts.aliases || {})
  return aliasOptions.reduce<any>((o, [alias, k]) => {
    Object.assign(o, { get [alias]() {
      return baseObj[k]
    } })
    return o
  }, {})
}

export const getCliParams = (args: string[] = processArgs) => {
  const argsList = args.map(a => a.trim()).filter(Boolean)
  const result = {
    ...parseBaseParams(options),
    '--': argsList,
  }
  const aliasMap = Object.keys(options.params)
    .reduce<{ [key: string]: string[]}>((map, key) => ({ ...map, [key]: [key] }), {})
  Object.entries(options.aliases || {})
    .forEach(([alias, key]) => {
      aliasMap[key].push(alias)
    })

  let curArgs = argsList
  const argsIndex = args.indexOf('--')
  if (argsIndex !== -1) {
    result['--'] = curArgs.splice(argsIndex, curArgs.length - argsIndex).slice(1)
  }
  Object.entries(aliasMap)
    .forEach(([key, aliases]) => {
      const aliasKeys = aliases.map(a => (a.length === 1 ? `-${a}` : `--${a}`))
      if (curArgs.filter(args => aliasKeys.includes(args)).length !== 0) {
        if ((options.params as any)[key].type === Boolean) {
          (result as any)[key] = true
          curArgs = curArgs.filter(args => !aliasKeys.includes(args))
        }
      }
    })
  if (argsIndex === -1) {
    result['--'] = curArgs
  }
  return Object.assign(result, parseAppendParams(options, result))
}

export default getCliParams

interface IBaseOptions {
  params: {
    [key: string]: {
      type: typeof Boolean | typeof String | typeof Number,
      default?: any,
    },
  },
}

interface IAppendBaseOptions<T extends IBaseOptions> {
  aliases: {
    [param: string]: keyof T['params'],
  },
}

type IOptions<T extends IBaseOptions = IBaseOptions> = T & IAppendBaseOptions<T>

type ParseType<T> = T extends typeof Boolean ?
  boolean : T extends typeof String ?
    string : T extends typeof Number ? number : unknown

type ParseBaseParamsReteurn<T extends IOptions> = {
  [key in keyof T['params']]: ParseType<T['params'][key]['type']>
}

type ParseBaseParamsFn = <T extends IOptions>(opts: T) => ParseBaseParamsReteurn<T>

type ParseAppendParamsFn = <T extends IOptions, K extends ParseBaseParamsReteurn<T>>(opts: T, baseObj: K) => {
  [key in keyof T['aliases']]: typeof baseObj[T['aliases'][key]]
}
