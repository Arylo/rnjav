# RnJav

## Installation

```shell
npm i -g rnjav
```

## Execute

```shell
rnjav [folderPath]
```

or

```shell
npx rnjav [folderPath]
```

### Flow Process

```text
┌────────────┐
│            │
│  Folder(s) │
│            │      ┌───────────────────────┐
└────────────┘ ───► │                       │
                    │  Filter Invaild Paths │
┌────────────┐ ───► │                       │
│            │      └───────────────────────┘
│  File(s)   │                  ▼
│            │      ┌───────────────────────┐
└────────────┘      │                       │
                    │  Transform to Infos   │
                    │                       │
                    └───────────────────────┘
┌────────────┐                  ▼
│            │      ┌───────────────────────┐
│  New       │      │                       │
│  Name      │ ◄─── │  Process Rename       │
│  File(s)   │      │                       │
│            │      └───────────────────────┘
└────────────┘
```
