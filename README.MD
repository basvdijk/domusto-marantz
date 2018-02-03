# DOMUSTO marantz plugin

```
plugin:       Marantz
author:       Bas van Dijk
category:     system
version:      0.0.1
website:      http://domusto.com
description:  Control your Marantz receiver e.g. power, volume, mute etc.
```

## Features
- [x] Power on/off
- [x] Mute on/off
- [x] Volume up/down
- [X] Select input

## Hardware needed
- Marantz AVR

## Tested with
- Marantz SR6010

## Installation

Execute in the domusto-server folder:
```sh
$ ./domusto.js plugin add basvdijk/domusto-marantz
```

## Configuration

1. Add the section below to your `config.ts`
2. Set the correct ip address of your Marantz device
3. Restart DOMUSTO

```js
{
    enabled: true,
    dummyData: false,
    debug: true,
    type: 'MARANTZ',
    settings: {
        ip: '192.168.178.1',  // IP address of the Marantz device
        pollDelay: 5000       // (optional) ms between polls, default: 10000
    }
}
```

## Example devices
```js

// Power on/off
{
    id: 'MARANTZ-POWER',
    enabled: true,
    role: 'output',
    name: 'Marantz',
    type: 'switch',
    subType: 'on/off',
    protocol: {
        pluginId: 'MARANTZ',
        deviceId: 'power',
    }
},

// Mute enable/disable
{
    id: 'MARANTZ-MUTE',
    enabled: true,
    role: 'output',
    name: 'Mute',
    type: 'switch',
    subType: 'on/off',
    protocol: {
        pluginId: 'MARANTZ',
        deviceId: 'mute',
    }
},

// Volume up/down
{
    id: 'MARANTZ-VOLUME',
    enabled: true,
    role: 'output',
    name: 'Volume',
    type: 'switch',
    subType: 'up/down',
    protocol: {
        pluginId: 'MARANTZ',
        deviceId: 'volume',
    }
},
```

## Input source switch

Valid values for protocol subType:

  - GAME
  - SAT/CBL
  - NET
  - USB/IPOD
  - TUNER
  - DVD
  - BD
  - HDRADIO
  - AUX1
  - AUX2
  - MPLAY
  - TV
  - PHONO
  - IRADIO
  - M-XPORT
  - NETHOME

```js
{
    id: 'MARANTZ-SOURCE-GAME',
    enabled: true,
    role: 'output',
    name: 'Game',
    type: 'switch',
    subType: 'momentary',
    protocol: {
        pluginId: 'MARANTZ',
        deviceId: 'source',
        value: 'GAME'
    }
},
{
    id: 'MARANTZ-SOURCE-MPLAY',
    enabled: true,
    role: 'output',
    name: 'MPlayer',
    type: 'switch',
    subType: 'momentary',
    protocol: {
        pluginId: 'MARANTZ',
        deviceId: 'source',
        value: 'MPLAY'
    }
},

```