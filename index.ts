import util from '../../util';
import config from '../../config';

// DOMUSTO
import DomustoPlugin from '../../domusto/DomustoPlugin';
import DomustoEmitter from '../../domusto/DomustoEmitter';
import DomustoSignalHub from '../../domusto/DomustoSignalHub';

// INTERFACES
import { Domusto } from '../../domusto/DomustoInterfaces';
import DomustoDevicesManager from '../../domusto/DomustoDevicesManager';

// PLUGIN SPECIFIC
let AVReceiver = require('marantz-avr');

/**
 * Marantz plugin for DOMUSTO Home Automation
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoMarantz
 * @extends {DomustoPlugin}
 */
class DomustoMarantz extends DomustoPlugin {

    /**
     * Creates an instance of DomustoMarantz.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoMarantz
     */
    constructor(pluginConfiguration: Domusto.PluginConfiguration) {

        super({
            plugin: 'Marantz-avr remote',
            author: 'Bas van Dijk',
            category: Domusto.PluginCategories.audio,
            version: '0.0.1',
            website: 'http://domusto.com'
        });

        // Initialize hardware plugin
        let receiver = new AVReceiver(pluginConfiguration.settings.ip);
        this.hardwareInstance = receiver;

        // Poll current receiver status
        this.refreshReceiverStatus();

        // Start polling receiver on interval
        setInterval(() => this.refreshReceiverStatus(), pluginConfiguration.settings.pollInterval | 10000);

    }

    onSignalReceivedForPlugin(signal: Domusto.Signal) {

        console.log('Marantz', signal);

        switch (signal.type) {

            case 'power':

                this.hardwareInstance.setPowerState(signal.data['state'] === 'on').then(res => {
                    this.broadcastSignal('power', {
                        state: signal.data['state']
                    });
                }, error => console.log(error));
                break;

            case 'source':
                this.hardwareInstance.setInputSource(signal.type).then(res => {
                }, error => console.log(error));
                break;

            case 'mute':

                this.hardwareInstance.setMuteState(signal.data['state'] === 'on').then(res => {
                    this.broadcastSignal('mute', {
                        state: signal.data['state']
                    });
                }, error => console.log(error));
                break;

            case 'volume':

                switch (signal.data['state']) {
                    case 'off':
                        this.hardwareInstance.volumeUp().then(res => {
                            this.broadcastSignal('volume', {
                                state: signal.data['state']
                            });
                        }, error => console.log(error));
                        break;

                    case 'on':
                        this.hardwareInstance.volumeDown().then(res => {
                            this.broadcastSignal('volume', {
                                state: signal.data['state']
                            });
                        }, error => console.log(error));
                        break;
                }

                break;

        }
    }

    /**
     * Polls the receiver and broadcast the status to the Signal Hub
     *
     * @memberof DomustoMarantz
     */
    refreshReceiverStatus() {

        this.hardwareInstance.getState().then(
            res => {

                DomustoSignalHub.broadcastSignal({
                    sender: Domusto.SignalSender.plugin,
                    pluginId: 'MARANTZ',
                    type: 'power',
                    data: {
                        state: res.power ? 'on' : 'off'
                    }
                });

                DomustoSignalHub.broadcastSignal({
                    sender: Domusto.SignalSender.plugin,
                    pluginId: 'MARANTZ',
                    type: 'input',
                    data: {
                        state: res.input
                    }
                });

                DomustoSignalHub.broadcastSignal({
                    sender: Domusto.SignalSender.plugin,
                    pluginId: 'MARANTZ',
                    type: 'volume',
                    data: {
                        state: res.volumeLevel
                    }
                });

                DomustoSignalHub.broadcastSignal({
                    sender: Domusto.SignalSender.plugin,
                    pluginId: 'MARANTZ',
                    type: 'mute',
                    data: {
                        state: res.mute ? 'on' : 'off'
                    }
                });

                DomustoSignalHub.broadcastSignal({
                    sender: Domusto.SignalSender.plugin,
                    pluginId: 'MARANTZ',
                    type: 'surroundMode',
                    data: {
                        state: res.surroundMode
                    }
                });
            },
            error => console.log(error)
        );

    }

    toString() {
        return super.toString();
    }
}

export default DomustoMarantz;